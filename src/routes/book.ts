import express from "express";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getBooksByAuthor,
} from "../controllers/bookController";

const router = express.Router();

router.get("/all", getBooks);
router.get("/detail/:id", getBook);
router.post("/create", createBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);
router.get("/author/:authorId", getBooksByAuthor);

export default router;
