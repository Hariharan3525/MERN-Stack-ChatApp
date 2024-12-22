import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        const connectDB = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${connectDB.connection.name}`)
    }
    catch(error){
        console.log("MongoDB connection error:",error)
    }
}