import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI is undefined! Make sure it's set in your environment variables.");
    process.exit(1); // Exit if no DB URL
}


mongoose.connect(mongoURI).then(() => {
    console.log('Connected to the database');
}).catch((error)=>{
    console.log("Database couldn't connect: " + error.message);
})

export default mongoose;