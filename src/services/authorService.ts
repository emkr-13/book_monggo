import * as authorRepository from "../repositories/authorRepository";

export const getAuthors = async (
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  return authorRepository.getAllAuthors(page, limit, search);
};

export const getAuthor = async (id: number) => {
  const author = await authorRepository.getAuthorById(id);
  if (!author) throw new Error("Author not found");
  return author;
};

export const addAuthor = async (authorData: any) => {
  return authorRepository.createAuthor(authorData);
};

export const modifyAuthor = async (id: number, updateData: any) => {
  const author = await authorRepository.updateAuthor(id, updateData);
  if (!author) throw new Error("Author not found or already deleted");
  return author;
};

export const removeAuthor = async (id: number) => {
  const author = await authorRepository.deleteAuthor(id);
  if (!author) throw new Error("Author not found or already deleted");
  return author;
};
