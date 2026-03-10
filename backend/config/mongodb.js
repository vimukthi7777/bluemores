<<<<<<< HEAD
import mongoose from "mongoose"
=======
import mongoose from 'mongoose'
>>>>>>> dev

const connectDB = async() => {
    mongoose.connection.on('connected', ()=>{
        console.log('Connected to MongoDB')
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

export default connectDB;