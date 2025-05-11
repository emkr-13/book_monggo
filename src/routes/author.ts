import express from "express";
import {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";

const router = express.Router();

router.get("/all", getAuthors);
router.get("/detail/:id", getAuthor);
router.post("/create", createAuthor);
router.put("/update/:id", updateAuthor);
router.delete("/delete/:id", deleteAuthor);

export default router;
