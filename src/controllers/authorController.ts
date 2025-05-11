import { Request, Response } from "express";
import * as authorService from "../services/authorService";
import { sendResponse } from "../utils/responseHelper";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;

    const result = await authorService.getAuthors(page, limit, search);
    sendResponse(res, 200, "Authors retrieved successfully", {
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const author = await authorService.getAuthor(id);
    sendResponse(res, 200, "Author retrieved successfully", author);
  } catch (error: any) {
    const status = error.message === "Author not found" ? 404 : 500;
    sendResponse(res, status, error.message);
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const author = await authorService.addAuthor(req.body);
    sendResponse(res, 201, "Author created successfully");
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const author = await authorService.modifyAuthor(id, req.body);
    sendResponse(res, 200, "Author updated successfully", author);
  } catch (error: any) {
    const status =
      error.message === "Author not found or already deleted" ? 404 : 500;
    sendResponse(res, status, error.message);
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const author = await authorService.removeAuthor(id);
    sendResponse(res, 200, "Author deleted successfully");
  } catch (error: any) {
    const status =
      error.message === "Author not found or already deleted" ? 404 : 500;
    sendResponse(res, status, error.message);
  }
};
