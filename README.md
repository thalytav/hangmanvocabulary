# Tebak Kata — Hangman Kosakata Indonesia & Inggris

Game edukasi berbasis **Hangman** untuk belajar kosakata Bahasa Indonesia ↔ Bahasa Inggris. Dikerjakan sebagai Tugas Mata Kuliah **Game Edukasi dan Simulasi**, Teknik Informatika ITS 2026.

---

## Tim Pengembang

| NRP | Nama | Kelas |
| :--- | :--- | :--- |
| 5025231055 | Thalyta Vius Pramesti | Game Edukasi dan Simulasi (T) |
| 5025231064 | Alvin Zanua Putra | Game Edukasi dan Simulasi (T) |

---

## Tentang Game

**Tebak Kata** adalah game Hangman kosakata bilingual. Pemain diberi sebuah kata sebagai petunjuk (misalnya kata Indonesia *"Dapur"*), lalu harus menebak ejaan terjemahannya huruf demi huruf (misalnya *"Kitchen"*).

Tujuan utamanya adalah **belajar kosakata baru sambil bermain**. Setiap tebakan salah akan memunculkan satu bagian tubuh "si orang gantung". Gagal lebih dari 6 kali, atau kehabisan waktu 30 detik, berarti kalah untuk kata tersebut.

Game berjalan **100% offline** langsung dari browser — tidak butuh internet maupun instalasi apapun.

---

## Cara Bermain

1. **Pilih arah terjemahan** — Indonesia ke Inggris, atau sebaliknya.
2. **Pilih kategori** — Semua, Rumah, Makanan, Sekolah, Kantor, atau Jalan.
3. Tekan **Mulai Bermain** untuk memulai sesi (10 kata per sesi).
4. Baca petunjuk kata yang tampil di tengah layar.
5. **Tebak huruf** dengan klik tombol keyboard di layar, atau ketik dari keyboard fisik.
   - Huruf **benar** → muncul di kotak kata, tombol berubah hijau.
   - Huruf **salah** → masuk daftar "Salah", tombol berubah merah, satu bagian hangman muncul.
6. Tebak semua huruf sebelum **6 kesalahan** atau **30 detik** habis.
7. Gunakan tombol **Lewati Kata** jika ingin melewati kata yang sulit.
8. Di akhir sesi, akan tampil ringkasan jumlah benar dan total skor.

---

## Fitur Utama

| Fitur | Penjelasan |
| :--- | :--- |
| **5 Kategori** | Rumah, Makanan, Sekolah, Kantor, dan Jalan. |
| **Tebakan dua arah** | Indonesia ke Inggris atau sebaliknya, bisa dipilih di menu. |
| **Timer 30 detik** | Setiap kata punya batas waktu; sisa waktu memberi bonus skor. |
| **6 Nyawa** | Ditampilkan sebagai hati (❤️/🤍) sekaligus gambar hangman di layar. |
| **Keyboard ganda** | Bisa klik tombol on-screen atau ketik langsung dari keyboard fisik. |
| **Sistem skor** | Dihitung berdasarkan kecepatan, ketepatan, dan kombo beruntun (streak). |
| **Streak / kombo** | Jawaban benar beruntun memberi bonus skor tambahan. |
| **Efek suara** | Suara sintetis untuk setiap aksi: benar, salah, menang, kalah, timer, dll. |
| **Animasi & efek** | Confetti saat menang, partikel huruf, flash layar, dan berbagai animasi lain. |
| **Responsif** | Tampilan menyesuaikan layar desktop (16:9) maupun ponsel (portrait). |

---

## Sistem Skor

Skor dihitung setiap kali berhasil menebak kata:

```
Skor = Dasar + Bonus Waktu + Bonus Streak
```

| Komponen | Rumus |
| :--- | :--- |
| **Dasar** | `100 − (jumlah salah × 10)` |
| **Bonus Waktu** | `sisa detik × 2` |
| **Bonus Streak** | `(streak − 1) × 20` |
| **Minimum** | 20 poin (jika hasil hitung di bawah 20) |

Jika salah 6 kali, waktu habis, atau memilih lewati — streak kembali ke 0 dan tidak ada skor untuk kata tersebut.

---

## Struktur Data Kosakata

Data kosakata disimpan di `assets/data/data.js` dalam dua variabel global:

```js
// Daftar kategori
const KATEGORI = [
  { "id": 1, "nama": "Rumah" },
  { "id": 2, "nama": "Makanan" },
  // ...
];

// Daftar kosakata
const KOSAKATA = [
  { "kategori_id": 1, "kategori": "Rumah", "inggris": "Kitchen", "indonesia": "Dapur" },
  // ...
];
```

Untuk menambah kata baru, cukup tambahkan entri baru ke array `KOSAKATA` dengan `kategori_id` yang sesuai.

---

## Cara Menjalankan

Game ini murni HTML/CSS/JavaScript — cukup buka `index.html` langsung di browser.

```bash
# Atau jalankan server lokal agar data termuat sempurna:
python3 -m http.server 8000
# Lalu buka: http://localhost:8000
```

Semua pustaka (jQuery & Bootstrap) sudah tersimpan lokal di `assets/vendor/` — tidak perlu koneksi internet.

---

## Teknologi

- **HTML5** — struktur halaman dan layout layar.
- **CSS3** — tema, animasi, confetti, partikel, dan efek visual.
- **JavaScript + jQuery** — logika permainan, skor, timer, dan efek suara.
- **Web Audio API** — efek suara sintetis tanpa file audio eksternal.
- **Bootstrap** (offline) — penunjang gaya dasar.
