import { Request, Response } from "express";
import * as bookService from "../services/bookService";
import { sendResponse } from "../utils/responseHelper";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;

    const result = await bookService.getBooks(page, limit, search);
    sendResponse(res, 200, "Books retrieved successfully", {
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.getBook(id);
    sendResponse(res, 200, "Book retrieved successfully", book);
  } catch (error: any) {
    const status = error.message === "Book not found" ? 404 : 500;
    sendResponse(res, status, error.message);
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.addBook(req.body);
    sendResponse(res, 201, "Book created successfully");
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.modifyBook(id, req.body);
    sendResponse(res, 200, "Book updated successfully");
  } catch (error: any) {
    const status =
      error.message === "Book not found or already deleted" ? 404 : 500;
    sendResponse(res, status, error.message);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const book = await bookService.removeBook(id);
    sendResponse(res, 200, "Book deleted successfully");
  } catch (error: any) {
    const status =
      error.message === "Book not found or already deleted" ? 404 : 500;
    sendResponse(res, status, error.message);
  }
};

export const getBooksByAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = parseInt(req.params.authorId);
    const books = await bookService.getAuthorBooks(authorId);
    sendResponse(res, 200, "Author books retrieved successfully", books);
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
};
