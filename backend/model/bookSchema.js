import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pdf: {
        type: String,
    },
    epub: {
        type: String,
    },
    genre: [{type: String}],
    
})

const Book = mongoose.model('Book', bookSchema);

export default Book;