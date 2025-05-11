import Author, { IAuthor } from "../models/author";
import { pagination, PaginationResponse } from "../utils/helper";

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

export const getAllAuthors = async (
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<{ data: IAuthor[]; pagination: PaginationResponse }> => {
  const query = { deletedAt: null };

  if (search) {
    Object.assign(query, {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { biography: { $regex: search, $options: "i" } },
        { nationality: { $regex: search, $options: "i" } },
      ],
    });
  }

  const total = await Author.countDocuments(query);
  const data = await Author.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ id: 1 });

  return {
    data,
    pagination: await pagination(total, page, limit),
  };
};

export const getAuthorById = async (id: number): Promise<IAuthor | null> => {
  return Author.findOne({ id, deletedAt: null });
};

export const createAuthor = async (
  authorData: Omit<IAuthor, "id" | "createdAt" | "updatedAt">
): Promise<IAuthor> => {
  const author = new Author(authorData);
  return author.save();
};

export const updateAuthor = async (
  id: number,
  updateData: Partial<IAuthor>
): Promise<IAuthor | null> => {
  return Author.findOneAndUpdate(
    { id, deletedAt: null },
    { ...updateData, updatedAt: new Date() },
    { new: true }
  );
};

export const deleteAuthor = async (id: number): Promise<IAuthor | null> => {
  return Author.findOneAndUpdate(
    { id, deletedAt: null },
    { deletedAt: new Date() },
    { new: true }
  );
};
