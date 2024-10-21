import { Router } from "express";
import postController from "../controller/postConroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/post",postController.index)
router.post("/post",authMiddleware,postController.store)

export default router

