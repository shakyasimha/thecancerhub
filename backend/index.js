import express from "express"
import dotenv from "dotenv"

// Setting up env here 
dotenv.config() 

// Port value 
const port = process.env.PORT || 3000; 

// Defining app here
const app = express() 

// API endpoint here 
app.get('/', (req, res)=>{
    res.send(`Server started at port ${port}`)
})

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
})