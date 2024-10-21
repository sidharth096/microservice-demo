import { Router } from "express";
import postRouter from "./postRouter.js"

const router = Router();

router.use("/api",postRouter)

export default router