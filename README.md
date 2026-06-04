# P-13 : Implementasi Game Edukasi (HangMan Vocabulary)

---

# Nama Anggota Kelompok:

| NRP | Nama | Kelas |
| :--- | :--- | :--- |
| 5025231055 | Thalyta Vius Pramesti | Game Edukasi dan Simulasi (T) |
| 5025231064 | Alvin Zanua Putra | Game Edukasi dan Simulasi (T) |

# Deskripsi

Implementasi game edukasi hangman vocabulary dengan menggunakan HTML, CSS, dan JavaScript dengan prompt:

> Saya ingin membuat game edukasi yang mengajarkan kosakata indonesia-inggris dengan data di file `kosakata_inggris.xlsx` beserta kategorinya. Berikan beberapa opsi sebelum implementasi.
>
> Ketentuan aplikasi:
> - offline
> - jquery, css, bootstrap, html
> - rasio layar 16:9

Game mengajarkan **150 kosakata** dalam **5 kategori** (Rumah, Makanan, Sekolah, Kantor, Jalan — masing-masing 30 kata) yang bersumber dari `kosakata_inggris.xlsx`. Pemain menebak ejaan sebuah kata berdasarkan arti/terjemahannya, huruf demi huruf, dengan gaya permainan Hangman.

## Hasil Modifikasi

### Original HangMan

**a. Deskripsi**

Saat halaman dibuka, `selectedWord` dipilih acak dari array `words` lewat `Math.floor(Math.random() * words.length)`. Kata ini disembunyikan, ditampilkan sebagai deretan garis bawah kosong — satu kotak `.letter` untuk tiap huruf, dibuat oleh fungsi `displayWord()`.

Pemain menekan huruf. Event `keypress` menangkap tombolnya, mengubah ke huruf kecil, dan memeriksa apakah itu huruf a–z. Lalu ada percabangan:

- Kalau huruf ada di dalam kata dan belum pernah ditebak, huruf dimasukkan ke array `correctLetters`, lalu `displayWord()` mengisi huruf itu di semua posisi yang cocok.
- Kalau huruf tidak ada di kata dan belum pernah ditebak, masuk ke array `wrongLetters`, lalu `updateWrongLettersElement()` menampilkannya di daftar "Wrong" dan memunculkan satu bagian tubuh baru.
- Kalau huruf sudah pernah ditebak (benar maupun salah), muncul notifikasi "You have already entered this letter" yang tampil 2 detik.

**Cara menang/kalah.** Gambar orang punya 6 bagian (`figure-part`: kepala, badan, dua lengan, dua kaki). Fungsi `updateWrongLettersElement()` menampilkan bagian sebanyak jumlah huruf salah. Begitu `wrongLetters.length` mencapai 6, pemain kalah — popup muncul menampilkan kata yang sebenarnya. Sebaliknya, di `displayWord()`, setiap kali huruf benar ditambahkan, kode membandingkan teks yang tampil dengan `selectedWord`; kalau sudah sama persis, pemain menang dan popup "Congratulations" muncul.

**Main lagi.** Tombol "Play Again" mengosongkan `correctLetters` dan `wrongLetters`, memilih kata acak baru, menggambar ulang tampilan, dan menyembunyikan popup.

Itu inti mekaniknya: satu kata tersembunyi, tebak per huruf, 6 kesalahan = kalah, kata lengkap = menang.

**b. Preview Hasil Game:**

screen awal
![alt text](/assets/docs/original/image.jpg)
screen tebak kata
![alt text](/assets/docs/original/image2.jpg)
screen kalah
![alt text](/assets/docs/original/image4.jpg)
screen menang
![alt text](/assets/docs/original/image3.jpg)

### Modified HangMan

**a. Deskripsi:**

Versi modifikasi mengubah Hangman dari sekadar tebak ejaan menjadi **game edukasi kosakata Indonesia–Inggris**, dengan sumber kata dari `kosakata_inggris.xlsx`. Seluruh kode tampilan ditulis ulang memakai **jQuery + Bootstrap**, dengan panggung permainan dikunci pada **rasio 16:9**, dan aplikasi berjalan sepenuhnya **offline**.

**Sumber data offline.** Karena game dijalankan langsung dari `file://`, membaca `.xlsx` lewat browser akan diblokir (CORS). Maka isi Excel dikonversi menjadi `assets/data/data.js` berisi dua array JavaScript, `KATEGORI` dan `KOSAKATA`, yang dimuat lewat tag `<script>`. Library jQuery dan Bootstrap juga disimpan lokal di `assets/vendor/`, sehingga tidak butuh koneksi internet sama sekali.

**Layar mulai & pemilihan kategori.** Saat dibuka, `buildCategories()` menampilkan tombol setiap kategori (Rumah, Makanan, Sekolah, Kantor, Jalan) ditambah opsi "Semua". Pemain memilih kategori lalu menekan **Mulai Bermain**, yang memanggil `startSession()`.

**Sesi permainan.** Satu sesi terdiri dari **10 kata** (`SESSION_WORDS`). `startSession()` membangun `pool` kata sesuai kategori, mengacaknya dengan fungsi `shuffle()` (algoritma Fisher–Yates), dan menyiapkan antrian. Setiap kata diambil lewat `nextWord()`.

**Arah tebakan acak dua arah.** Pada tiap kata, `nextWord()` mengacak arah: kadang menampilkan **kata Indonesia** sebagai petunjuk dan pemain menebak ejaan **kata Inggris**, kadang sebaliknya. Petunjuk ditampilkan di sebuah kartu (`clue-card`) lengkap dengan label bahasa, dan instruksi "Tebak kata ... -nya".

**Penanganan spasi & tanda hubung.** Fungsi `renderWord()` menggambar slot huruf. Karakter spasi (mis. "Living room") dan tanda hubung (mis. "Langit-langit") **ditampilkan otomatis** dan tidak perlu ditebak; `neededLetters()` hanya menghitung huruf a–z sebagai huruf yang harus ditebak, dan `isWordComplete()` memeriksa apakah seluruhnya sudah tertebak.

**Input ganda: keyboard layar + keyboard fisik.** `buildKeyboard()` membuat tombol A–Z di layar yang bisa diklik. Selain itu event `keydown` membuat keyboard fisik tetap berfungsi. Keduanya memanggil `handleGuess()`. Tombol yang sudah dipakai dinonaktifkan dan diberi warna hijau (benar) atau merah (salah). Huruf yang diulang memunculkan toast "Huruf itu sudah kamu pilih".

**Skor, streak, dan timer.** Fitur tambahan dibanding versi asli:

- **Skor** (`winWord()`): dasar `100 - (10 × jumlah salah)`, ditambah bonus waktu (`timeLeft × 2`) dan bonus streak (`(streak − 1) × 20`), minimal 20 poin.
- **Streak** (🔥): bertambah tiap jawaban benar beruntun, dan kembali ke 0 jika salah, lewat, atau waktu habis.
- **Timer** (`startTimer()`): 30 detik per kata (`TIME_PER_WORD`); chip timer berkedip merah saat ≤ 5 detik, dan kata otomatis gagal jika waktu habis (`timeUp()`).
- **Tombol Lewati**: melewati kata tanpa penalti skor, namun memutus streak.

**Cara menang/kalah per kata.** Sama seperti aslinya, ada 6 bagian figur (`MAX_WRONG`). Setiap salah menampilkan satu bagian via `showFigurePart()` dan mengurangi indikator nyawa (❤️/🤍) di `renderLives()`, disertai animasi getar (`shake`). Enam kesalahan = kata gagal (`loseWord()`), kata lengkap = menang (`winWord()`). Setiap hasil memunculkan popup dengan emoji, judul, jawaban beserta terjemahannya, dan perolehan skor.

**Akhir sesi.** Setelah 10 kata, `endSession()` menampilkan ringkasan: jumlah kata benar dari total dan total skor. Tombol **Main Lagi** mengembalikan pemain ke layar mulai untuk memilih kategori kembali.

**b. Hasil Game:**

screen awal
![alt text](/assets/docs/modified/image.jpg)
screen tebak kata
![alt text](/assets/docs/modified/image2.jpg)
screen kalah
![alt text](/assets/docs/modified/image3.jpg)
screen menang
![alt text](/assets/docs/modified/image4.jpg)
![alt text](/assets/docs/modified/image4.jpg)

## Cara Menjalankan

1. Buka `index.html` di browser (klik dua kali — tidak perlu server lokal).
2. Pilih kategori (atau **Semua**), lalu tekan **Mulai Bermain**.
3. Tebak ejaan kata dari petunjuk arti yang muncul, lewat keyboard layar atau keyboard fisik.
4. Salah 6 kali = kata gagal. Tersedia tombol **Lewati** dan **timer 30 detik** per kata.
5. Satu sesi berisi 10 kata, lalu muncul ringkasan skor.

## Struktur File

```
hangmanvocabulary/
├── index.html
├── style.css
├── script.js                       (jQuery)
├── README.md
└── assets/
    ├── data/
    │   ├── kosakata_inggris.xlsx    (sumber data asli)
    │   └── data.js                  (hasil konversi → dipakai game)
    ├── docs/                        (gambar dokumentasi)
    └── vendor/
        ├── jquery.min.js
        ├── bootstrap.min.css
        └── bootstrap.bundle.min.js
```

## Convert XLSX ke JS menggunakan Python

Jika `kosakata_inggris.xlsx` berubah, regenerasi `data.js`:

```bash
python3 - <<'PY'
import openpyxl, json
wb = openpyxl.load_workbook('assets/data/kosakata_inggris.xlsx')
cat = {r[0]:r[1] for r in list(wb['Kategori'].iter_rows(values_only=True))[1:]}
rows = list(wb['Kosakata'].iter_rows(values_only=True))[1:]
data = [{'kategori_id':r[0],'kategori':cat[r[0]],'inggris':r[1],'indonesia':r[2]} for r in rows]
cats = [{'id':k,'nama':v} for k,v in cat.items()]
js  = '// Data kosakata (offline)\n'
js += 'const KATEGORI = ' + json.dumps(cats, ensure_ascii=False, indent=2) + ';\n\n'
js += 'const KOSAKATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n'
open('assets/data/data.js','w',encoding='utf-8').write(js)
print('OK', len(data), 'kata')
PY
```

## Tentang

Institut Teknologi Sepuluh Nopember - Teknik Informatika - Game Edukasi dan Simulasi
