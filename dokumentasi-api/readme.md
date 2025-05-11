# 📚 Book Management API Documentation

Sistem ini adalah API untuk manajemen buku, penulis, serta autentikasi dan profil pengguna. Dibangun menggunakan Node.js, TypeScript, PostgreSQL, dan JWT untuk otentikasi.

## 🌐 Base URL

```
http://localhost:3080/api/
```

---

## 🔐 Authentication & Profile

### POST `/auth/login`

Login menggunakan email dan password.

**Request Body:**

```json
{
  "email": "admin@mail.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt_token>",
    "refreshToken": "<refresh_token>"
  }
}
```

---

### POST `/auth/register`

Registrasi pengguna baru.

**Request Body:**

```json
{
  "email": "admin@mail.com",
  "fullname": "Admin User",
  "password": "password123"
}
```

---

### GET `/user/detail`

Mengambil profil pengguna.

**Headers:**

```
Authorization: Bearer <token>
```

---

### POST `/user/update`

Update data profil pengguna.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "fullname": "Nama Baru"
}
```

---

### POST `/user/logout`

Logout pengguna.

**Headers:**

```
Authorization: Bearer <token>
```

---

## 👤 Author Endpoint

### GET `/author/all?limit=1&page=1`

Mengambil daftar semua penulis dengan pagination.

**Headers:**

```
Authorization: Bearer <token>
```

---

### POST `/author/create`

Membuat penulis baru.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Author Name",
  "biography": "Biography Text",
  "nationality": "Nationality"
}
```

---

### PUT `/author/update/:id`

Update data penulis berdasarkan ID.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Updated Name",
  "biography": "Updated Bio",
  "nationality": "Updated Country"
}
```

---

### GET `/author/detail/:id`

Melihat detail penulis.

**Headers:**

```
Authorization: Bearer <token>
```

---

### DELETE `/author/delete/:id`

Menghapus penulis berdasarkan ID.

**Headers:**

```
Authorization: Bearer <token>
```

---

## 📖 Book Endpoint

### GET `/book/all`

Mengambil semua data buku.

**Headers:**

```
Authorization: Bearer <token>
```

---

### GET `/book/detail/:id`

Melihat detail buku berdasarkan ID.

**Headers:**

```
Authorization: Bearer <token>
```

---

### GET `/book/author/:authorId`

Melihat semua buku berdasarkan ID penulis.

**Headers:**

```
Authorization: Bearer <token>
```

---

### POST `/book/create`

Menambahkan buku baru.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Book Title",
  "isbn": "unique-isbn",
  "genre": [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
    "Fantasy",
    "Romance"
  ],
  "publishedYear": 2010,
  "author": "author_id"
}
```

---

### PUT `/book/update/:id`

Update informasi buku.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:** _(sama seperti create)_

---

### DELETE `/book/delete/:id`

Menghapus buku berdasarkan ID.

**Headers:**

```
Authorization: Bearer <token>
```

---

---

## ⚙️ Environment

Gunakan environment Postman `local`:

```
http://localhost:3080/api/
```

---

> Dokumentasi ini dihasilkan berdasarkan file koleksi Postman. Jika Anda ingin versi Swagger/OpenAPI atau dokumentasi HTML, silakan minta!
