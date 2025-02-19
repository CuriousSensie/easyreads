import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to the database');
}).catch((error)=>{
    console.log(error.message);
})