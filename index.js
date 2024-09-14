import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import questionRouter from './routes/questioneries.route.js'
import companyRouter from "./routes/organization.route.js"
import { ApiError } from "./utils/Error.js"
import path from "path"
import cors from 'cors';
dotenv.config({
    path: '.env'
})
const port = process.env.PORT || 3000

const app = express()

const __dirname = path.resolve();

connectDB()
.then(()=>{
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
.catch((error)=>{
    console.log("Connection failed =>",error);
});


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors());


app.use("/api/v1/users",userRouter)
app.use("/api/v1/company",companyRouter)
app.use("/api/v1/question",questionRouter)

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    } else {
        console.log("error is : ",err)
        res.status(500).json({
            success: false,
            message: "Int Error",
            errors: [],
        });
    }
});


