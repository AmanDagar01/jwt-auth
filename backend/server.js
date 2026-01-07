import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import router from "./routes/auth.routes.js";


const app = express();
dotenv.config();

// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// db connection
connectDB();
console.log("Database connected successfully");


// define api route
app.use("/api", router);


// starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  })