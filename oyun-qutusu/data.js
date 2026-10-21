/* Oyun Qutusu — məzmun və danışılan cümlələr.
   Bu fayl həm oyunda, həm də tools/make-voice.mjs-də istifadə olunur:
   cümləni dəyişsəniz, səs fayllarını yenidən yaradın (README-yə baxın). */

const ITEMS = [
  {id:'dog',cat:'animals',e:'🐶',w:'İt'},{id:'cat',cat:'animals',e:'🐱',w:'Pişik'},
  {id:'cow',cat:'animals',e:'🐮',w:'İnək'},{id:'bird',cat:'animals',e:'🐦',w:'Quş'},
  {id:'duck',cat:'animals',e:'🦆',w:'Ördək'},{id:'frog',cat:'animals',e:'🐸',w:'Qurbağa'},
  {id:'sheep',cat:'animals',e:'🐑',w:'Qoyun'},{id:'bee',cat:'animals',e:'🐝',w:'Arı'},
  {id:'owl',cat:'animals',e:'🦉',w:'Bayquş'},
  {id:'car',cat:'transport',e:'🚗',w:'Maşın'},{id:'police',cat:'transport',e:'🚓',w:'Polis maşını'},
  {id:'ambul',cat:'transport',e:'🚑',w:'Təcili yardım'},{id:'train',cat:'transport',e:'🚂',w:'Qatar'},
  {id:'plane',cat:'transport',e:'✈️',w:'Təyyarə'},{id:'bike',cat:'transport',e:'🚲',w:'Velosiped'},
  {id:'ship',cat:'transport',e:'🚢',w:'Gəmi'},{id:'moto',cat:'transport',e:'🏍️',w:'Motosiklet'},
  {id:'phone',cat:'home',e:'☎️',w:'Telefon'},{id:'door',cat:'home',e:'🔔',w:'Qapı zəngi'},
  {id:'clock',cat:'home',e:'🕰️',w:'Saat'},{id:'rain',cat:'home',e:'🌧️',w:'Yağış'},
  {id:'drum',cat:'home',e:'🥁',w:'Nağara'},{id:'thunder',cat:'home',e:'⚡',w:'Göy gurultusu'},
  {id:'drop',cat:'home',e:'💧',w:'Damcı'},
];
const COLORS = [
  {w:'Qırmızı',acc:'Qırmızını',is:'qırmızıdır',c:'#E53935'},{w:'Sarı',acc:'Sarını',is:'sarıdır',c:'#FDD835'},
  {w:'Yaşıl',acc:'Yaşılı',is:'yaşıldır',c:'#43A047'},{w:'Mavi',acc:'Mavini',is:'mavidir',c:'#1E88E5'},
  {w:'Narıncı',acc:'Narıncını',is:'narıncıdır',c:'#FB8C00'},{w:'Çəhrayı',acc:'Çəhrayını',is:'çəhrayıdır',c:'#F48FB1'},
  {w:'Bənövşəyi',acc:'Bənövşəyini',is:'bənövşəyidir',c:'#8E24AA'},{w:'Qəhvəyi',acc:'Qəhvəyini',is:'qəhvəyidir',c:'#795548'},
  {w:'Qara',acc:'Qaranı',is:'qaradır',c:'#222222'},{w:'Ağ',acc:'Ağı',is:'ağdır',c:'#FFFFFF'},
];
const THINGS = [
  {e:'🍎',w:'alma'},{e:'🍌',w:'banan'},{e:'🐟',w:'balıq'},{e:'⭐',w:'ulduz'},{e:'🎈',w:'şar'},
  {e:'🐞',w:'parabüzən'},{e:'🌸',w:'çiçək'},{e:'🍓',w:'çiyələk'},{e:'🐥',w:'cücə'},{e:'🚗',w:'maşın'},
];
const NUMW = ['','bir','iki','üç','dörd','beş','altı','yeddi','səkkiz','doqquz','on'];
const SHAPES = [
  {e:'🐘',w:'Fil',a:1},{e:'🦒',w:'Zürafə',a:1},{e:'🐇',w:'Dovşan',a:1},{e:'🐢',w:'Tısbağa',a:1},
  {e:'🦋',w:'Kəpənək',a:1},{e:'🐌',w:'İlbiz',a:1},{e:'🐓',w:'Xoruz',a:1},{e:'🐫',w:'Dəvə',a:1},
  {e:'🦀',w:'Xərçəng',a:1},{e:'🐙',w:'Ahtapot',a:1},{e:'🐬',w:'Delfin',a:1},{e:'🦔',w:'Kirpi',a:1},
  {e:'🌳',w:'Ağac'},{e:'🏠',w:'Ev'},{e:'🚲',w:'Velosiped'},{e:'☂️',w:'Çətir'},{e:'✈️',w:'Təyyarə'},
  {e:'🎸',w:'Gitara'},{e:'🍐',w:'Armud'},{e:'🔑',w:'Açar'},{e:'🍄',w:'Göbələk'},{e:'⚓',w:'Lövbər'},
];
const WORDS = [
  ['A','Arı','🐝'],['A','Alma','🍎'],['A','At','🐴'],['B','Balıq','🐟'],['B','Banan','🍌'],['C','Cücə','🐥'],
  ['Ç','Çiçək','🌸'],['Ç','Çətir','☂️'],['D','Dovşan','🐇'],['D','Dəvə','🐫'],['E','Ev','🏠'],['Ə','Əl','✋'],
  ['Ə','Əjdaha','🐉'],['F','Fil','🐘'],['G','Gəmi','🚢'],['G','Günəş','☀️'],['H','Hədiyyə','🎁'],['X','Xoruz','🐓'],
  ['X','Xiyar','🥒'],['I','Işıq','💡'],['İ','İt','🐶'],['İ','İlan','🐍'],['K','Kəpənək','🦋'],['K','Kirpi','🦔'],
  ['Q','Qatar','🚂'],['Q','Qurbağa','🐸'],['L','Limon','🍋'],['M','Maşın','🚗'],['M','Meymun','🐒'],['N','Nağara','🥁'],
  ['O','Od','🔥'],['Ö','Ördək','🦆'],['P','Pişik','🐱'],['P','Pinqvin','🐧'],['R','Raket','🚀'],['S','Saat','⏰'],
  ['S','Su','💧'],['Ş','Şar','🎈'],['Ş','Şir','🦁'],['T','Tısbağa','🐢'],['T','Top','⚽'],['U','Ulduz','⭐'],
  ['Ü','Üzüm','🍇'],['V','Velosiped','🚲'],['Y','Yumurta','🥚'],['Z','Zürafə','🦒'],['Z','Zəng','🔔'],
].map(([l,w,e])=>({l,w,e}));

/* Kimin balası? — ana (bütün bədən) və bala (üz) */
const BABIES = [
  {m:'İnək',   me:'🐄', b:'Buzov',        be:'🐮', praise:'Afərin! İnəyin balası buzovdur.'},
  {m:'İt',     me:'🐕', b:'Küçük',        be:'🐶', praise:'Afərin! İtin balası küçükdür.'},
  {m:'Toyuq',  me:'🐔', b:'Cücə',         be:'🐥', praise:'Afərin! Toyuğun balası cücədir.'},
  {m:'At',     me:'🐎', b:'Dayça',        be:'🐴', praise:'Afərin! Atın balası dayçadır.'},
  {m:'Qoyun',  me:'🐏', b:'Quzu',         be:'🐑', praise:'Afərin! Qoyunun balası quzudur.'},
  {m:'Kəpənək',me:'🦋', b:'Tırtıl',       be:'🐛', praise:'Afərin! Kəpənəyin balası tırtıldır.'},
  {m:'Pişik',  me:'🐈', b:'Bala pişik',   be:'🐱', praise:'Afərin! Pişiyin balası bala pişikdir.'},
  {m:'Dovşan', me:'🐇', b:'Bala dovşan',  be:'🐰', praise:'Afərin! Dovşanın balası bala dovşandır.'},
  {m:'Meymun', me:'🐒', b:'Bala meymun',  be:'🐵', praise:'Afərin! Meymunun balası bala meymundur.'},
  {m:'Pələng', me:'🐅', b:'Bala pələng',  be:'🐯', praise:'Afərin! Pələngin balası bala pələngdir.'},
];

/* Artıq olanı tap — qruplar. Meyvə ilə tərəvəz bir-birinə qarışdırılmır */
const GROUPS = [
  {id:'animal', name:'heyvan', items:[['🐶','İt'],['🐱','Pişik'],['🐮','İnək'],['🐸','Qurbağa'],['🐘','Fil'],['🐒','Meymun'],['🐇','Dovşan'],['🦁','Şir']]},
  {id:'fruit',  name:'meyvə', items:[['🍎','Alma'],['🍌','Banan'],['🍇','Üzüm'],['🍐','Armud'],['🍓','Çiyələk'],['🍊','Portağal'],['🍉','Qarpız'],['🍋','Limon']]},
  {id:'veg',    name:'tərəvəz', items:[['🥕','Kök'],['🥒','Xiyar'],['🍅','Pomidor'],['🥔','Kartof'],['🧅','Soğan'],['🌽','Qarğıdalı'],['🥦','Brokoli'],['🍆','Badımcan']]},
  {id:'vehicle',name:'nəqliyyat', items:[['🚗','Maşın'],['🚌','Avtobus'],['🚂','Qatar'],['✈️','Təyyarə'],['🚲','Velosiped'],['🚢','Gəmi'],['🚁','Vertolyot'],['🚀','Raket']]},
  {id:'clothes',name:'geyim', items:[['👕','Köynək'],['👖','Şalvar'],['🧦','Corab'],['🧢','Papaq'],['👗','Don'],['🧤','Əlcək'],['👟','Ayaqqabı'],['🧣','Şərf']]},
].map(g => ({...g, items: g.items.map(([e,w]) => ({e,w,g:g.id}))}));
const GROUP_CLASH = {fruit:'veg', veg:'fruit'};

/* Uşağın adı: bu adlar üçün səs əvvəlcədən yaradılır (tools/make-names.mjs).
   Siyahıda olmayan adı brauzerin öz səsi deyir. */
const NAMES = [
  // qızlar
  'Aylin','Ayla','Aysel','Aynur','Aytac','Aygün','Ayan','Ayşən','Ayşə','Aişə','Amina','Alina','Arya','Arzu','Asya',
  'Bahar','Banu','Ceyla','Ceyran','Dəniz','Diana','Dilarə','Ecrin','Elif','Ella','Elnarə','Elmira','Emiliya','Esmira','Eylül',
  'Fatimə','Fidan','Firəngiz','Gülay','Gülnar','Gülnur','Gülşən','Günay','Günel','Hilal','Həcər','İlahə','İnci','Jalə',
  'Kamilə','Kəmalə','Könül','Lalə','Lamiyə','Leyla','Mədinə','Mehriban','Melisa','Mələk','Məryəm','Milana','Mina',
  'Narın','Nazlı','Nərgiz','Nərmin','Nigar','Nilay','Nilufər','Nuranə','Nuray','Nurlana','Pəri','Rəna','Rəvanə','Röya',
  'Rüqəyyə','Sabina','Samirə','Sara','Səbinə','Selin','Sevda','Sevil','Sevinc','Solmaz','Sona','Şəbnəm','Şəlalə',
  'Tamilla','Təranə','Türkan','Ulduz','Ülkər','Ülviyyə','Vüsalə','Xədicə','Xumar','Yağmur','Yasəmən','Zəhra','Zərifə',
  'Zeynəb','Zümrüd',
  // oğlanlar
  'Əli','Altay','Anar','Araz','Arif','Aslan','Ayaz','Aydın','Ayxan','Azər','Babək','Bəhruz','Bəxtiyar','Cavid','Cəlal',
  'Cəmil','Ceyhun','Coşqun','Daniyal','Davud','Eldar','Elmar','Elnur','Elçin','Elşən','Elvin','Elxan','Emil','Emin','Emir',
  'Faiq','Fərhad','Fərid','Fuad','Həsən','Hüseyn','İbrahim','İlham','İlkin','İsa','İsmayıl','Kamal','Kamil','Kamran',
  'Kənan','Kərim','Mahir','Məhəmməd','Mehdi','Məmməd','Mikayıl','Murad','Musa','Nadir','Natiq','Nicat','Nihad','Nizami',
  'Nurlan','Oğuz','Orxan','Osman','Ömər','Pərviz','Polad','Qasım','Rauf','Rəşad','Rəsul','Rəvan','Ramil','Riyad','Rövşən',
  'Rüfət','Ruslan','Rüstəm','Səid','Səlim','Samir','Səməd','Sənan','Sərxan','Seymur','Sübhan','Şahin','Şamil','Tahir',
  'Taleh','Teymur','Tofiq','Toğrul','Tunar','Tural','Turan','Uğur','Ural','Ülvi','Ümid','Vaqif','Vasif','Vüsal','Yaqub',
  'Yaşar','Yunis','Yusif','Zakir','Zaur','Zəfər',
];
/* Ad → axtarış açarı: hərf fərqləri nəzərə alınmasın (Elcin = Elçin, Ali = Əli) */
const nameKey = s => s.trim().split(/\s+/)[0].toLocaleLowerCase('az')
  .replace(/ə/g,'e').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ü/g,'u')
  .replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g').replace(/̇/g,'');

/* Musiqi */
const NOTES = [['do',261.63],['re',293.66],['mi',329.63],['fa',349.23],['sol',392],['lya',440],['si',493.88],['do',523.25]];

const lower = w => w.toLocaleLowerCase('az');
const cap = w => w.charAt(0).toLocaleUpperCase('az') + w.slice(1);

/* Hər danışılan cümlə buradan gəlir */
const SAY = {
  soundPraise: it => `Afərin! Bu ${lower(it.w)}.`,
  colorAsk:    c  => `${c.acc} tap!`,
  colorPraise: c  => `Afərin! Bu ${c.is}.`,
  countAsk:    th => `Neçə ${th.w} var? Say!`,
  countNum:    n  => cap(NUMW[n]),
  countPraise: (n,th) => `Afərin! ${cap(NUMW[n])} ${th.w}.`,
  shadowAsk:   s  => s.a ? 'Bu kimin kölgəsidir?' : 'Bu nəyin kölgəsidir?',
  shadowPraise:s  => `Afərin! Bu ${lower(s.w)}.`,
  letterAsk:   w  => `${w.l} hərfi. Hansı söz ${w.l} hərfi ilə başlayır?`,
  letterPraise:w  => `Afərin! ${w.w}. ${w.l} hərfi!`,
  word:        it => it.w,
  babyAsk:     p  => `${p.m}. Onun balası hansıdır?`,
  babyPraise:  p  => p.praise,
  oddAsk:      'Hansı artıqdır? Uyğun olmayanı tap!',
  oddPraise:   it => `Afərin! ${it.w} artıqdır.`,
  musicHi:     'Gəl, musiqi çalaq!',
  letsPlay:    'Gəl oynayaq!',
  askName:     'Salam! Sənin adın nədir?',
  tryAgain:    'Yenə cəhd et!',
  memoryAsk:   'Eyni şəkilləri tap!',
  endGreat:    'Super! Sən çox ağıllısan!',
  endGood:     'Əla! Çox yaxşı oynadın!',
  endOk:       'Yaxşı! Gəl bir də oynayaq!',
};

/* Cümlə → fayl adı (FNV-1a). Brauzer və generator eyni funksiyanı işlədir. */
function voiceFile(text){
  let h = 0x811c9dc5; const s = text.normalize('NFC');
  for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return 'voice/v_' + h.toString(16).padStart(8,'0') + '.mp3';
}

function allPhrases(){
  const out = new Set();
  ITEMS.forEach(it => { out.add(SAY.soundPraise(it)); out.add(SAY.word(it)); });
  COLORS.forEach(c => { out.add(SAY.colorAsk(c)); out.add(SAY.colorPraise(c)); });
  THINGS.forEach(th => { out.add(SAY.countAsk(th)); for(let n=1;n<=10;n++) out.add(SAY.countPraise(n,th)); });
  for(let n=1;n<=10;n++) out.add(SAY.countNum(n));
  SHAPES.forEach(s => { out.add(SAY.shadowAsk(s)); out.add(SAY.shadowPraise(s)); });
  WORDS.forEach(w => { out.add(SAY.letterAsk(w)); out.add(SAY.letterPraise(w)); });
  BABIES.forEach(p => { out.add(SAY.babyAsk(p)); out.add(SAY.babyPraise(p)); });
  GROUPS.forEach(g => g.items.forEach(it => out.add(SAY.oddPraise(it))));
  ['tryAgain','memoryAsk','endGreat','endGood','endOk','oddAsk','musicHi','letsPlay','askName'].forEach(k => out.add(SAY[k]));
  return [...out];
}
