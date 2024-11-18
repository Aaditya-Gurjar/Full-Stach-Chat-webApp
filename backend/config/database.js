import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGOURI).then(()=> {
        console.log("Database Connected")
    }).catch(()=> {
        console.log("Error in Database Connection : ",error);
    })
}

export default connectDB;