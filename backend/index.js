import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from './routes/productRoutes.js';

// Setting up env here 
dotenv.config();

// Port value 
const port = process.env.PORT || 3000; 

// Defining app here
const app = express();

// Additional modules that the app will use 
app.use(cors);

// Routes will be included here
app.use('/products', productRoutes);

// Creating mongoose connection 
mongoose
    .connect("mongodb://127.0.0.1/ECommerce")
    .then(()=>console.log("Connected to MongoDB...."))
    .catch((err)=>console.error("Could not connect to MongoDB...."));

// API endpoint here 
app.get('/', (req, res)=>{
    res.send(`Server started at port ${port}`);
});

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});
