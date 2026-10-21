// data.js-dəki bütün cümlələr üçün Azərbaycan dilində səs faylları yaradır.
// Tələblər: edge-tts (pip install edge-tts) və ffmpeg.
// İşlətmək: node tools/make-voice.mjs [--voice az-AZ-BanuNeural] [--force]
// Artıq mövcud olan fayllar ötürülür (--force hamısını yenidən yaradır).

import { readFileSync, existsSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import path from 'node:path';
import vm from 'node:vm';

const run = promisify(execFile);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const voice = args.includes('--voice') ? args[args.indexOf('--voice') + 1] : 'az-AZ-BanuNeural';
const force = args.includes('--force');
const edgeTts = process.env.EDGE_TTS || 'edge-tts';

const ctx = {};
vm.createContext(ctx);
vm.runInContext(readFileSync(path.join(root, 'data.js'), 'utf8') + '\n;this.allPhrases=allPhrases;this.voiceFile=voiceFile;', ctx);
const phrases = ctx.allPhrases();

mkdirSync(path.join(root, 'voice'), { recursive: true });
const tmp = path.join(tmpdir(), 'oyun-qutusu-voice');
mkdirSync(tmp, { recursive: true });

const wanted = new Set(phrases.map(t => path.basename(ctx.voiceFile(t))));
const todo = phrases.filter(t => force || !existsSync(path.join(root, ctx.voiceFile(t))));
console.log(`${phrases.length} cümlə, ${todo.length} yeni fayl yaradılacaq (${voice})`);

let done = 0;
async function make(text) {
  const out = path.join(root, ctx.voiceFile(text));
  const raw = path.join(tmp, path.basename(out));
  await run(edgeTts, ['--voice', voice, '--rate=+8%', '--pitch=+18Hz', '--text', text, '--write-media', raw]);
  // Sükutu kəs, səs səviyyəsini bərabərləşdir
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-af',
    'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,loudnorm=I=-15:TP=-1.5:LRA=11,apad=pad_dur=0.08',
    '-ac', '1', '-ar', '24000', '-b:a', '64k', out]);
  rmSync(raw, { force: true });
  done++;
  if (done % 20 === 0 || done === todo.length) console.log(`  ${done}/${todo.length}`);
}

const queue = todo.slice();
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const text = queue.shift();
    for (let attempt = 1; ; attempt++) {
      try { await make(text); break; }
      catch (e) { if (attempt >= 3) { console.error('Alınmadı:', text, e.message); break; } }
    }
  }
}));

// data.js-də artıq olmayan köhnə faylları sil
for (const f of readdirSync(path.join(root, 'voice'))) {
  if (f.endsWith('.mp3') && !wanted.has(f)) { rmSync(path.join(root, 'voice', f)); console.log('Silindi:', f); }
}
console.log('Hazırdır.');
