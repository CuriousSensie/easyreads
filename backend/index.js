import express from 'express'
import dotenv from 'dotenv'
import { Webhook } from 'svix'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import User from './model/userSchema.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to the database');
}).catch((error)=>{
    console.log(error.message);
    
})

const app = express()

app.post(
    "/api/webhooks",
    bodyParser.raw({type:"application/json"}),
    async function (req, res) {
        try {
            const payloadString = req.body.toString();
            const svixHeaders = req.headers;
            
            const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY)
            const event = wh.verify(payloadString, svixHeaders)

            const {id, ...attributes} = event.data;
            const eventType = event.type;

            if (eventType === 'user.created') {
                // console.log(`User ${id} is ${eventType}`);
                // console.log(attributes); 
                const firstName = attributes.first_name;
                const lastName = attributes.last_name;
                const user = new User({
                    clerkUserId: id,
                    firstName: firstName,
                    lastName: lastName,
                })

                await user.save();
                console.log('User is created ');
                
            }

            res.status(200).json({
                success: true,
                message: "Webhook received",
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }      
    }
);

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`listeniing on port ${port}`);    
})