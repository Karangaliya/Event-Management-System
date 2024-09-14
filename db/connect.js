import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log(`Connect With Database is SuccessFull || DB_HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Connect With Database is Failed..!",error);
        process.exit(1)
    }
}

export default connectDB;