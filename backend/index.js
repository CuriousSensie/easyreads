import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import auth from './routes/auth.js';
import books from './routes/books.js';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();
import "./db.js";

const app = express();

// ⚠️ Apply express.raw() for Webhooks before other middleware
app.use("/api/auth/webhooks", express.raw({ type: "application/json" }));

// Apply JSON middleware (except for webhooks)
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    // origin is the root of frontend url
    origin: 'https://easyreads.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
};
app.use(cors());

app.use("/api/books", books);
app.use("/api/auth", auth);
app.use("/uploads", express.static('uploads'));


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
