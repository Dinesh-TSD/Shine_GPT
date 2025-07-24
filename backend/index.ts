import app from "./app.js"
import { connectDB } from "./src/db/connection";

//server connections & listeners
const PORT = process.env.PORT || 5000 
connectDB().then(() => {
    app.listen(5000, () => console.log(`server running on port ${PORT}`));
}).catch((err) => console.log(err)
)



