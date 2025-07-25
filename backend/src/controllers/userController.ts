import { NextFunction, Request, Response } from "express";
import User from "../Models/UserModel.js"
import { hash } from "bcrypt"

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
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword })
        await user.save();
        return res.status(200).json({ mes: "ok", user, id: user._id.toString() })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "ERROR", cause: error })

    }
}