import { NextFunction, Request, Response } from "express";
import User from "../Models/UserModel.js"
import { compare, hash } from "bcrypt"
import { createToken } from "../utils/Token.js";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({ mes: "ok", users })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "ERROR", cause: error })

    }
}

export const Signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(401).send("user already registered")

        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword })
        await user.save();

        res.clearCookie("auth_token", {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        })

        //create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        })
        return res.status(201).json({ mes: "ok", user, id: user._id.toString() })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "ERROR", cause: error })

    }
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).send("User Not registered")
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(403).send("Incorect password")
        }

         //create token and store cookie
        res.clearCookie("auth_token", {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        })

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        })

        return res.status(200).json({ mes: "ok", id: user._id.toString() })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "ERROR", cause: error })

    }
}