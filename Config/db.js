import mongoose from 'mongoose';
import colors from "colors"

const connectDB = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected To Mongoose Database: ${conn.connection.host}`.bgGreen)
    }catch(error){
        console.log(`Error in Mongoose Db : ${error}`.bgRed)
    }
}

export default connectDB