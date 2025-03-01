import express from 'express';
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import User from "../model/userSchema.js";

dotenv.config();
const router = express.Router();

router.post("/webhooks", async (req, res) => {
    try {
        console.log("Webhook Received:", req.body);

        const payloadString = req.body.toString('utf8'); 
        const svixHeaders = req.headers;

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        const event = wh.verify(payloadString, svixHeaders);

        const { id, ...attributes } = event.data;
        const eventType = event.type;

        if (eventType === 'user.created') {
            const firstName = attributes.first_name;
            const lastName = attributes.last_name;

            const user = new User({
                clerkUserId: id,
                firstName,
                lastName,
            });

            await user.save();
            console.log('User Created:', firstName, lastName);
        }

        res.status(200).json({
            success: true,
            message: "Webhook received",
        });
    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// add favorites to the user collection
router.post("/favorites/add", async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        const user = await User.findById({ clerkUserId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.favorites.includes(bookId)) {
            return res.status(400).json({ message: "Book already in favorites" });
        }

        user.favorites.push(bookId);
        await user.save();

        res.status(200).json({ message: "Book added to favorites", favorites: user.favorites });
    } catch (error) {
        console.error("Error adding favorite:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


// remove favorites from the user collection
router.post("/favorites/remove", async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        const user = await User.findById({ clerkUserId: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.favorites = user.favorites.filter(id => id.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: "Book removed from favorites", favorites: user.favorites });
    } catch (error) {
        console.error("Error removing favorite:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


// get favorites from the user collection
router.get("/favorites/:userId", async (req, res) => {
    try {
        const user = await User.findById({ clerkUserId: req.params.userId }).populate("favorites");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        console.error("Error fetching favorites:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// add to library
router.post("/library/add", async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        const user = await User.findOne({ clerkUserId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.library.includes(bookId)) {
            return res.status(400).json({ message: "Book already in Library" });
        }

        user.library.push(bookId);
        await user.save();

        res.status(200).json({ message: "Book added to library", library: user.library });
    } catch (error) {
        console.error("Error adding library:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


// remove from library
router.post("/library/remove", async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        const user = await User.findOne({ clerkUserId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.library = user.library.filter(id => id.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: "Book removed from library", library: user.library });
    } catch (error) {
        console.error("Error removing library:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// get library
router.get("/library/:userId", async (req, res) => {
    try {
        const user = await User.findById({ clerkUserId: req.params.userId }).populate("library");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ library: user.library });
    } catch (error) {
        console.error("Error fetching library:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
