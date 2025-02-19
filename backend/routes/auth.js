import express from 'express';
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import User from "../model/userSchema.js";

dotenv.config();

const router = express.Router();

// Clerk Webhook Handler
router.post(
    "/webhooks",
    async (req, res) => {
        try {
            const payloadString = req.body.toString(); // Ensure raw body is used
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
                console.log('✅ User Created:', firstName, lastName);
            }

            res.status(200).json({
                success: true,
                message: "Webhook received",
            });
        } catch (error) {
            console.error("❌ Webhook Error:", error.message);
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
);

export default router;
