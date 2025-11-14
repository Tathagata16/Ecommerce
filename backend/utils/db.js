import mongoose from "mongoose";

export const  connectDb = async()=>{
   try {const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");}
    catch(error){
        console.log("error in db connection", error);
        
    }
}