import express from 'express'
import cors from'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import categoryRoute from './routes/categoryRoute.js'
import subCategoryRoute from './routes/subCategoryRoutes.js'
import productRoute from './routes/productRoutes.js'
import adminRoute from './routes/adminRoute.js'
import cookieParser from 'cookie-parser'
import { adminSeed } from './config/adminSeed.js'

dotenv.config()
connectDB().then(()=>{
    adminSeed()
})
const app=express()

const PORT = process.env.PORT ||5000


const allowedOrigins = [
  "http://localhost:5173",
  "https://full-stack-rhua.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);




app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use("/api/admin", adminRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product", productRoute)
app.use("/api/subCategory",subCategoryRoute)



app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`)
})