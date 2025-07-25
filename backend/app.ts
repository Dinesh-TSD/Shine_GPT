import express from "express"
import { config } from "dotenv";
import morgan from "morgan";
import userRoute from "./src/routes/userRoute.js"
import chatRoute from "./src/routes/chatRoute.js"
import cookieParser from "cookie-parser"

config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))

//API`s
app.use("/api/users",userRoute)
app.use("/api/chats",chatRoute)


//remove at production
app.use(morgan("dev"))

export default app; 