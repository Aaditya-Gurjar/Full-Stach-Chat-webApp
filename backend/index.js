// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js"
import cors from 'cors'
import { app,server } from "./socket/socket.js";
dotenv.config();

// const app = express();
const PORT = process.env.PORT || 5000;
// Database Connetion 
connectDB();
// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin : 'http://localhost:3000',
    credentials : true
}

app.use(cors(corsOptions));


// routes

app.use("/api/v1/user", userRouter)
app.use("/api/v1/message", messageRoute)


// app.listen(PORT, (req,res)=>{
//     console.log(`App is Listening at ${PORT}`);
// })

server.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
  });