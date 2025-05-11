import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import authorRouter from "./author";
import bookRouter from "./book";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();
const protectedRouter = Router();

router.use("/auth", authRoutes);
protectedRouter.use("/user", userRoutes);
protectedRouter.use("/author", authorRouter);
protectedRouter.use("/book", bookRouter);
router.use(authenticate, protectedRouter);

export default router;
