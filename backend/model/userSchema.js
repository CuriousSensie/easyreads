import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    library: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]

})

const User = mongoose.model('User', userSchema);
export default User;