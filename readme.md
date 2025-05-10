# Test Book

Teknologi yang digunakan:

- TypeScript
- Node.js (TS)
- Monggo DB (database)

## Installation

### Step 1: Setup Environment

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

### Step 2: Install Dependencies

Jalankan perintah berikut untuk menginstal semua package:

```bash
npm install
```


### Step 3: Menjalankan Seeder

Jalankan file seeder sesuai dengan nama file di folder `seeders`. Contoh:

```bash
ts-node src/seeders/userSeeder.ts
```

## Menjalankan Aplikasi

Untuk menjalankan aplikasi, gunakan perintah berikut:

```bash
npm run dev
```
