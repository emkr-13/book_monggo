import * as bookRepository from "../repositories/bookRepository";

export const getBooks = async (
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  const result = await bookRepository.getAllBooks(page, limit, search);

  // Pastikan data author selalu ada atau null
  result.data = result.data.map((book) => ({
    ...book,
    author: book.author || null,
  }));

  return result;
};

export const getBook = async (id: number) => {
  const book = await bookRepository.getBookById(id);
  if (!book) throw new Error("Book not found");

  // Pastikan struktur response konsisten
  return {
    ...book,
    author: book.author || null,
  };
};

export const addBook = async (bookData: any) => {
  return bookRepository.createBook(bookData);
};

export const modifyBook = async (id: number, updateData: any) => {
  const book = await bookRepository.updateBook(id, updateData);
  if (!book) throw new Error("Book not found or already deleted");
  return book;
};

export const removeBook = async (id: number) => {
  const book = await bookRepository.deleteBook(id);
  if (!book) throw new Error("Book not found or already deleted");
  return book;
};

export const getAuthorBooks = async (authorId: number) => {
  return bookRepository.getBooksByAuthor(authorId);
};
