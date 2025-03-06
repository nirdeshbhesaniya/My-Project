import mongoose from "mongoose";

const connectDB = async () => {
try {
   const connectionInstance =  mongoose.connect(`${process.env.MONGODB_URI}`)
   console.log(`MongoDB Connected !!`);
   
} catch (error) {
    console.log("Mongoose connection error:", error);
    process.exit(1);
}
}

export default connectDB;