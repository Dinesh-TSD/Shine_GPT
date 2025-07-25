import { Router } from "express";
import { getAllUsers, Signup } from "../controllers/userController.js";

const router = Router()

router.get("/",getAllUsers)
router.post("/signup",Signup)

export default router;