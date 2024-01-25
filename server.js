import express from 'express';
import colors from "colors"
import dotenv from "dotenv"
import connectDB from './Config/db.js';

// configura env
dotenv.config()

//rest object
const app = express();

//connect database
// connectDB();

//rest api
app.get('/api',(req,res)=>{
    res.send({message:"wellcom to  ecommerce app"})
})

//PORT
const PORT = process.env.PORT || 5000

//run listen
app.listen(PORT, ()=>{
    console.log(`server running on  ${process.env.DEV_MODE} mode on port: ${PORT}`.bgCyan.white)
})
