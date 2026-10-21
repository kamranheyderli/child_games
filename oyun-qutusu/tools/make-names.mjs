// data.js-dəki NAMES siyahısından bir səs faylı (names/names.mp3) və indeks (names/index.js) yaradır.
// Bütün adlar bir faylda olur ki, sayt yüzlərlə kiçik fayl daşımasın.
// Tələblər: edge-tts və ffmpeg. İşlətmək: node tools/make-names.mjs [--voice az-AZ-BanuNeural]

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import path from 'node:path';
import vm from 'node:vm';

const run = promisify(execFile);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const voice = args.includes('--voice') ? args[args.indexOf('--voice') + 1] : 'az-AZ-BanuNeural';
const edgeTts = process.env.EDGE_TTS || 'edge-tts';
const GAP = 0.45; // adlar arasında sükut (saniyə)
const RATE = 24000;
// Klaviaturada Azərbaycan hərfi olmadan yazılan adlar
const ALIASES = { ali: 'Əli', mehemmed: 'Məhəmməd', muhammed: 'Məhəmməd', memmed: 'Məmməd' };

const ctx = {};
vm.createContext(ctx);
vm.runInContext(readFileSync(path.join(root, 'data.js'), 'utf8') + '\n;this.NAMES=NAMES;this.nameKey=nameKey;', ctx);
const names = [...new Set(ctx.NAMES)];

const tmp = path.join(tmpdir(), 'oyun-qutusu-names');
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
mkdirSync(path.join(root, 'names'), { recursive: true });

async function make(name, i) {
  const mp3 = path.join(tmp, `n${i}.mp3`), wav = path.join(tmp, `n${i}.wav`);
  for (let attempt = 1; ; attempt++) {
    try { await run(edgeTts, ['--voice', voice, '--rate=+8%', '--pitch=+18Hz', '--text', name + '!', '--write-media', mp3]); break; }
    catch (e) { if (attempt >= 3) throw e; }
  }
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp3, '-af',
    'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,loudnorm=I=-15:TP=-1.5:LRA=11',
    '-ac', '1', '-ar', String(RATE), '-c:a', 'pcm_s16le', wav]);
  const { stdout } = await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav]);
  return parseFloat(stdout);
}

console.log(`${names.length} ad yaradılır (${voice})`);
const durs = new Array(names.length);
const queue = names.map((n, i) => i);
let done = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) { const i = queue.shift(); durs[i] = await make(names[i], i); if (++done % 40 === 0) console.log(`  ${done}/${names.length}`); }
}));

// Sükut + ad + sükut + ad ... ardıcıllığı
const silence = path.join(tmp, 'gap.wav');
await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi', '-i', `anullsrc=r=${RATE}:cl=mono`, '-t', String(GAP), '-c:a', 'pcm_s16le', silence]);
const list = [], clips = {};
let t = GAP; list.push(`file '${silence}'`);
names.forEach((n, i) => {
  clips[ctx.nameKey(n)] = [+t.toFixed(3), +durs[i].toFixed(3)];
  list.push(`file '${path.join(tmp, `n${i}.wav`)}'`, `file '${silence}'`);
  t += durs[i] + GAP;
});
for (const [k, n] of Object.entries(ALIASES)) clips[k] = clips[ctx.nameKey(n)];
writeFileSync(path.join(tmp, 'list.txt'), list.join('\n'));
await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'list.txt'),
  '-ac', '1', '-ar', String(RATE), '-b:a', '64k', path.join(root, 'names', 'names.mp3')]);

writeFileSync(path.join(root, 'names', 'index.js'),
  '/* tools/make-names.mjs ilə yaradılıb — əl ilə dəyişməyin. ad açarı: [başlanğıc, uzunluq] saniyə */\n' +
  'const NAME_CLIPS = ' + JSON.stringify(clips) + ';\n');
rmSync(tmp, { recursive: true, force: true });
console.log(`Hazırdır: ${names.length} ad, ${t.toFixed(1)} s`);
