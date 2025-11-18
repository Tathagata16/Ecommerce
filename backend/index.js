import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDb } from './utils/db.js';
import authRoute from './routes/auth.routes.js'
import cors from 'cors'
import productRoutes from './routes/product.route.js'

dotenv.config();
const app  = express();
const PORT =   3000;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

connectDb();

app.use("/api",authRoute);
app.use("/api/products",productRoutes);





app.listen(PORT,()=>{console.log("server listening at port:",PORT)});