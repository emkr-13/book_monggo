import Book from "../models/book";

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
