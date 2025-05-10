import Author from "../models/author";

export const createAuthors = async (authorsData: any[]) => {
  // Create one by one to trigger auto-increment
  const authors = [];
  for (const authorData of authorsData) {
    const author = new Author(authorData);
    await author.save();
    authors.push(author);
  }
  return authors;
};