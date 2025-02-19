import express from "express";
import multer from "multer";
import Book from "../model/bookSchema.js"

const router = express.Router()

const storage = multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage});
router.post("/create", upload.single('pdf'), async (req, res) => {
    const {image, title, author, description} = req.body;
    const pdf = req.file.path;

    try {
        const newBook = new Book({
            image, 
            title, 
            author,
            description, 
            pdf
        });

        await newBook.save();
        res.status(201).json({ message: 'Book creation: Success' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server Error' });
        
    }
})

export default router