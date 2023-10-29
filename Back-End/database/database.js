import mongoose from "mongoose"

// Hàm kết nối CSDL MongoDB
const connectDB = () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI)
        console.log("Connect to MongoDB successfully.");
        return connection
    } catch (error) {
        throw new Error('Connect failse')
    }
}

export default connectDB