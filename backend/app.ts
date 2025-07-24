import express from "express"
import { config } from "dotenv";
import morgan from "morgan";
import userRoute from "./src/routes/userRoute.js"
import chatRoute from "./src/routes/chatRoute.js"

config();

const app = express();

//middlewares
app.use(express.json());

//API`s
app.use("/api/users",userRoute)
app.use("/api/chats",chatRoute)


//remove at production
app.use(morgan("dev"))

export default app; 