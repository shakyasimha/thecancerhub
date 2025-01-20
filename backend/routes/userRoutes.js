import express from "express";
import User from './models/user.js';

const router = express.Router();

// Defining routes here
// Creating a new user entry 
router.post('/create', async (req, res)=>{
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
        });
    
        await User.create(newUser);
        res.status(200).send({
            message: 'User created successfully.'
        });
    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: '[error] User was not created.'
        });
    }
});

// Fetching specific user info
router.get('/:id', async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).send(JSON.stringify(user));
    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: `[error]: ${error}`
        });
    }
});

// Fetching all user info
router.get('/all', async (req, res)=>{
    try {
        const users = await User.find();
        res.status(200).send(JSON.stringify(users));
    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: `[error]: ${error}`
        });
    }
});

// Update a user based on id
router.get('/update/:id', async (req, res)=>{
    try {
        const user_id = req.params.id; 

        await User.findByIdAndUpdate(user_id, {
            username: req.body.id,
            email: req.body.email, 
            password: req.body.password,
            phone: req.body.phone
        })

        res.status(200).send('User details updated successfully.');
    } catch(error) {
        console.log(error);
        res.status(500).send({
            message: `[error] ${error}`
        });
    }
})
