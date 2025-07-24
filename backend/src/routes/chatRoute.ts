import { Router } from "express";
import { getUserChats } from "../controllers/chatController.js";

const router = Router()

router.get("/userchat",getUserChats)

export default router; 