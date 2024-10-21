import { Router } from "express";
import authController from "../controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/auth/register",authController.register)
router.post("/auth/login",authController.login)

//private route
router.get("/auth/user",authMiddleware,authController.user)

export default router