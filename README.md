# Daterminant — Empowering Sustainable Growth

Prototipe antarmuka (front-end) platform digital pendukung UMKM, konsep **Econsphere Team**.
Dibangun dengan HTML, CSS, dan JavaScript murni tanpa dependensi, jadi bisa langsung dibuka atau dipasang di GitHub Pages.

## Fitur / layar
Splash · Login · Profil pengguna · Form profil bisnis · Beranda · Automated Alert System · Business Intelligence · Market Insight · Customize Improvement · Investment & Funding Matchmaking · Toko (Roti Nenek) · Data Driven Business Training · Detail kursus · BrainBox (chatbot AI)

## Menjalankan
```bash
python3 -m http.server 8000   # lalu buka http://localhost:8000
```
Atau buka `index.html` langsung di browser.

## Struktur
```
index.html       kerangka halaman + tab bar
css/style.css    desain (token warna di :root)
js/data.js       data dummy (ganti dengan API)
js/app.js        router hash + render tiap layar
```

## Deploy ke GitHub Pages
Settings → Pages → Deploy from a branch → `main` / root.

## Catatan pengembangan
- Data masih dummy di `js/data.js`.
- Chat BrainBox adalah placeholder; sambungkan ke endpoint AI di `js/app.js` (cari `TODO`).
- Login belum memakai autentikasi sungguhan.

## Lisensi
MIT
