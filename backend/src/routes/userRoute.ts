import { Router } from "express";
import { getAllUsers, Login, Signup } from "../controllers/userController.js";
import {validate ,signupValidator, LoginValidator } from "../utils/validators.js"

const router = Router();

router.get("/",getAllUsers);
router.post("/signup",validate(signupValidator),Signup);
router.post("/login",validate(LoginValidator),Login)


export default router;