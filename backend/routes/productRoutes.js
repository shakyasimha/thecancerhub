import { Router } from "express";
import Product from '../models/product.js';

const router = Router();

// Defining routes here
// Create a new database entry
router.post('/create', async (req, res)=>{
    try {
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
        res.status(200).send("Product saved to the database.")
    } catch(error) {
        console.error(error);
        res.status(500).send({
            message: '[error] Error saving product to the database',
        }); 
    }
});

// Get all the product list 
router.get("/read", async (req, res)=>{
    try {
        const productList = await Product.find();
        res.status(200).send(JSON.stringify(productList));
    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: '[error] Could not fetch products.'
        });
    }
});

// Update a product based on id
router.put("/update/:id", async (req, res)=>{
    try{
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

        res.status(200).send("Product updated successfully.");
    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: error,
        })
    }
});

// Delete a product based on id 
router.delete("/delete/:id", async (req, res)=>{
    try {
        const product_id = req.params.id; 
        await Product.findByIdAndDelete(product_id);
        res.status(200).send("Product deleted.");
    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: `[error] ${error}`
        });
    }
});


// Exporting the module here
export default router;

