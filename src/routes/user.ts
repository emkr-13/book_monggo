import { Router } from "express";
import { editUser, getProfile, logout } from "../controllers/userController";

const router = Router();

// Rute untuk mendapatkan profil user
router.get("/detail", getProfile);

// Rute untuk mengedit user
router.post("/edit", editUser);
router.post("/logout", logout);

export default router;
