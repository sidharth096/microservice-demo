import { Router } from "express";
import userController from "../controller/userController.js";

const router = Router();

router.get("/getUser/:id",userController.getUser);
router.post("/getUsers",userController.getUsers);

export default router