import express from "express";
import multer from "multer";
import Book from "../model/bookSchema.js";

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File Filter for PDF, EPUB, and Images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "application/epub+zip", "image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, EPUB, and image files are allowed!"), false);
    }
};

// Multer Upload Middleware
const upload = multer({ storage, fileFilter });

// API Route to Upload Image, PDF & EPUB
router.post("/create", upload.fields([{ name: "pdf" }, { name: "epub" }, { name: "image" }]), async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const image = req.files["image"] ? req.files["image"][0].path : null;
        const pdf = req.files["pdf"] ? req.files["pdf"][0].path : null;
        const epub = req.files["epub"] ? req.files["epub"][0].path : null;

        if (!title || !author || !description) {
            return res.status(400).json({ message: "Title, Author, and Description are required!" });
        }

        const newBook = new Book({
            image,
            title,
            author,
            description,
            pdf,
            epub,
        });

        await newBook.save();
        res.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        console.error("Upload Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// API Route to Get All Books
router.get("/all", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error Fetching Books:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// API Route to Get Book by ID
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error("Error Fetching Book:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
