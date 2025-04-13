const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/getAllUsers', (req, res) => {
    try{
        const users = User.getAllUsers();
        res.send(users);
    }
    catch(err){
        console.error(err);
        res.status(401).send({message: err.message});
    }
    
});
module.exports = router;