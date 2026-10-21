# child_games

7 yaşa qədər uşaqlar üçün öyrədici oyunlar (Azərbaycan dilində).

## Oyunlar

- **[oyun-qutusu/](oyun-qutusu/index.html)**: 9 oyun bir yerdə: Kim Səslənir?, Rəngləri tap, Say və tap, Kölgə oyunu, Hərfin səsi, Yaddaş kartları, Kimin balası?, Artıq olanı tap, Musiqi alətləri. Yaş seçimi var: 3–4, 5, 6–7.
- **[kim-seslenir/](kim-seslenir/index.html)**: səs oyununun ayrıca versiyası, "Kəşf et" rejimi ilə.

## İşə salmaq

Quraşdırma lazım deyil. `index.html` faylını brauzerdə açın.

## Səslər (oyun-qutusu)

- `sounds/`: real heyvan və əşya səsləri (Wikimedia Commons). Müəlliflər və lisenziyalar [CREDITS.md](oyun-qutusu/CREDITS.md) faylındadır.
- `voice/`: Azərbaycan dilində danışan səs (Microsoft neyron səsi, az-AZ Banu). Hər cümlə bir mp3 faylıdır.
- Fayl tapılmasa, oyun sintez səsə və brauzerin öz danışan səsinə keçir.

Cümləni dəyişəndə və ya yeni söz əlavə edəndə (`oyun-qutusu/data.js`), səsləri yenidən yaradın:

```sh
pip install edge-tts      # bir dəfə
brew install ffmpeg       # bir dəfə
cd oyun-qutusu && node tools/make-voice.mjs
```

Skript yalnız yeni cümlələr üçün fayl yaradır, köhnə və artıq istifadə olunmayan faylları silir.

### Uşağın adı

Oyun ilk açılışda uşağın adını soruşur və tərifdə adla müraciət edir ("Aylin! Afərin! Bu it."). 200-dən çox Azərbaycan adı əvvəlcədən səsləndirilib və hamısı bir fayldadır (`names/names.mp3`, indeks `names/index.js`). Siyahıda olmayan adı brauzerin öz səsi deyir.

Yeni ad əlavə etmək üçün onu `data.js`-dəki `NAMES` siyahısına yazın və bu əmri işlədin:

```sh
cd oyun-qutusu && node tools/make-names.mjs
```

`kim-seslenir/` hələ köhnə versiyadır: səslər Web Audio API ilə sintez olunur, sözləri brauzerin səsi deyir.
