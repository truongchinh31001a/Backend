import express from 'express';
import colors from "colors"
import dotenv from "dotenv"
import connectDB from './Config/db.js';
import userRoutes from './Router/userRoutes.js';
import notaryRoutes from './Router/notaryRoutes.js';
import searchRoutes from './Router/searchRoutes.js'; 
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// configura env
dotenv.config()

//rest object
const app = express();

app.use(cors());
//connect database
connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(morgan('dev'))

app.use(cookieParser())

//rest api
app.use('/api/users', userRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/notary', notaryRoutes)

app.get('/api',(req,res)=>{
    res.send({message:"wellcom to  ecommerce app"})
})

//PORT
const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT, ()=>{
    console.log(`server running on  ${process.env.DEV_MODE} mode on port: ${PORT}`.bgCyan.white)
})
