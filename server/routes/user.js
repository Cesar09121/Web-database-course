const express = require('express');
const User = require('../models/user');
const router = express.Router();

router
.get('/getUsers', (req, res) => {
    try{
        const users = User.getUsers();
        res.send(users);
    }
    catch(err){
        console.error(err);
        res.status(401).send({message: err.message});
    }
    
})
.post('/login', async (req, res) => {
    try{
        const user = await User.login(req.body);
        res.send({...User, Password: undefined})
    }
    catch(err){
        res.status(401).send({message: err.message});
    }
})
.post('/register', async (req, res) => {
    try{
        const user = await User.register(req.body);
        res.send({...User, Password: undefined})
    }
    catch(err){
        res.status(401).send({message: err.message});
    }
})



 "http://localhost:3000/users/getUsers"
module.exports = router;