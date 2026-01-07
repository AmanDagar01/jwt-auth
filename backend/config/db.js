import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected sucessfully");
        
    } catch (error) {
        console.error("error in connecting with db",error);
        process.exit(1)
    }
    
}

export default connectDB;