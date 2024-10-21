import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use("/api",authRouter)
router.use("/api",userRouter)

export default router