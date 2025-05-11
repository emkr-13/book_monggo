import Book, { IBook } from "../models/book";
import Author, { IAuthor } from "../models/author";
import { pagination, PaginationResponse } from "../utils/helper";

export const createBooks = async (booksData: any[]) => {
  // Create one by one to trigger auto-increment
  const books = [];
  for (const bookData of booksData) {
    const book = new Book(bookData);
    await book.save();
    books.push(book);
  }
  return books;
};

export const getAllBooks = async (
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  const query = { deletedAt: null };

  if (search) {
    Object.assign(query, {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
      ],
    });
  }

  const total = await Book.countDocuments(query);
  const data = await Book.find(query)
    .lean() // Gunakan lean() untuk performa
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ id: 1 });

  // Manual populate karena menggunakan Number reference
  const authorIds = [...new Set(data.map((book) => book.author))];
  const authors = await Author.find(
    { id: { $in: authorIds } },
    "id name nationality"
  );

  const booksWithAuthors = data.map((book) => {
    const author = authors.find((a) => a.id === book.author);
    return {
      ...book,
      author: author || book.author, // Fallback ke ID jika author tidak ditemukan
    };
  });

  return {
    data: booksWithAuthors,
    pagination: await pagination(total, page, limit),
  };
};

export const getBookById = async (id: number): Promise<IBook | null> => {
  // Cari buku berdasarkan ID numerik
  const book = await Book.findOne({ id, deletedAt: null }).lean();
  
  if (!book) return null;

  // Jika buku ditemukan, cari author terkait
  if (book.author) {
    const author = await Author.findOne({ id: book.author }, 'id name nationality').lean();
    return {
      ...book,
      author: author || null // Fallback ke null jika author tidak ditemukan
    };
  }

  return book;
};

export const createBook = async (
  bookData: Omit<IBook, "id" | "createdAt" | "updatedAt">
): Promise<IBook> => {
  const book = new Book(bookData);
  return book.save();
};

export const updateBook = async (
  id: number,
  updateData: Partial<IBook>
): Promise<IBook | null> => {
  return Book.findOneAndUpdate(
    { id, deletedAt: null },
    { ...updateData, updatedAt: new Date() },
    { new: true }
  ).populate("author", "id name nationality");
};

export const deleteBook = async (id: number): Promise<IBook | null> => {
  return Book.findOneAndUpdate(
    { id, deletedAt: null },
    { deletedAt: new Date() },
    { new: true }
  );
};

export const getBooksByAuthor = async (authorId: number): Promise<IBook[]> => {
  return Book.find({ author: authorId, deletedAt: null })
    .populate("author", "id name")
    .sort({ publishedYear: -1 });
};
