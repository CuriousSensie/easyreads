import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import Book from "../model/bookSchema.js";
import s3Upload from "../s3service.js";

dotenv.config();

const router = express.Router();

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// API Route to Upload Image, PDF & EPUB and Save Book in MongoDB
router.post(
    "/create",
    upload.fields([{ name: "pdf" }, { name: "epub" }, { name: "image" }]),
    async (req, res) => {
        try {
            const { title, author, description } = req.body;
            // ensure genre is an array of strings
            let genre = req.body.genre;

            if (typeof genre === "string") {
                genre = genre.split(",").map(g => g.trim()); // Convert comma-separated string to array
            } else if (!Array.isArray(genre)) {
                genre = [];
            }

            if (!title || !description) {
                return res.status(400).json({ message: "Title and description are required!" });
            }

            let imageUrl = null, pdfUrl = null, epubUrl = null;

            // Upload to S3 if files exist
            if (req.files?.image) imageUrl = await s3Upload(req.files.image[0]);
            if (req.files?.pdf) pdfUrl = await s3Upload(req.files.pdf[0]);
            if (req.files?.epub) epubUrl = await s3Upload(req.files.epub[0]);

            // Create and save the new book
            const newBook = new Book({
                image: imageUrl,
                title,
                author,
                description,
                pdf: pdfUrl,
                epub: epubUrl,
                genre,
            });

            await newBook.save();
            res.status(201).json({ message: "Book created successfully", book: newBook });
        } catch (error) {
            console.error("Upload Error:", error);
            res.status(500).json({
                message: "Server Error",
                error: error.message,
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
            });
        }
    }
);

// API Route to Get All Books
router.get("/all", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error Fetching Books:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// API Route to Check Server
router.get("/test", (req, res) => {
    try {
        res.json({ message: "All books data works!" });
    } catch (error) {
        console.error("Test Route Error:", error.message);
        res.status(500).json({ error: "Server Error: " + error.message });
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
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
