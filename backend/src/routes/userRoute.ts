import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = Router()

router.get("/allusers",getAllUsers)

export default router;