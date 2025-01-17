import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Setting up env here 
dotenv.config();

// Port value 
const port = process.env.PORT || 3000; 

// Defining app here
const app = express();

// Additional modules that the app will use 
app.use(cors);

// Creating mongoose connection 
mongoose
    .connect("mongodb://127.0.0.1/ECommerce")
    .then(()=>console.log("Connected to MongoDB...."))
    .catch((err)=>console.error("Could not connect to MongoDB...."));

// API endpoint here 
app.get('/', (req, res)=>{
    res.send(`Server started at port ${port}`);
});

// Create a new database entry
app.post('/create', async (req, res)=>{
    const newProduct = new Product({
        title: req.body.title, 
        description: req.body.description, 
        price: req.body.price, 
        discountPercentage: req.body.discountPercentage,
        rating: req.body.rating, 
        stock: req.body.stock, 
        brand: req.body.brand,
        category: req.body.category,
        thumbnail: req.body.thumbnail, 
        images: req.body.images,
    })

    await Product.create(newProduct);
    res.send("Product saved to the database.")
});

// Get all the product list 
app.get("/read", async (req, res)=>{
    const productList = await Product.find();
    res.send(JSON.stringify(productList));
});

// Update a product based on id
app.put("/update/:id", async (req, res)=>{
    const product_id = req.params.id;
    
    await Product.findByIdAndUpdate(product_id, {
        title: req.body.title, 
        description: req.body.description, 
        price: req.body.price, 
        discountPercentage: req.body.discountPercentage,
        rating: req.body.rating, 
        stock: req.body.stock, 
        brand: req.body.brand,
        category: req.body.category,
        thumbnail: req.body.thumbnail, 
        images: req.body.images,
    });

    res.send("Product updated successfully.");
});

// Delete a product based on id 
app.delete("/delete/:id", async (req, res)=>{
    const product_id = req.params.id; 
    await Product.findByIdAndDelete(product_id);
    res.send("Product deleted.");
});



app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
});