import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

})

const Book = mongoose.model('Book', bookSchema);
export default Book;