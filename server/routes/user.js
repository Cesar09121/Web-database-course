const express = require('express');
const User = require('../models/user');
const router = express.Router();

router
    .get('/getUsers', async (req, res) => {
        try {
            const users = await User.getUsers();
            res.send(users);
        }
        catch(err) {
            console.error(err);
            res.status(401).send({message: err.message});
        }
    })
    .post('/login', async (req, res) => {
        try {
            const user = await User.login(req.body);
            res.send({...user, password: undefined});
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    .post('/register', async (req, res) => {
        try {
            const user = await User.register(req.body);
            res.send({...user, password: undefined});
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    .get('/createUserTable', async (req, res) => {
        try {
            await User.createUserTable();
            res.send("User Table Created");
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    .get('/validateUserRole', async (req, res) => {
        try {
            const user = await User.validateUserRole(req.body);
            res.send(user);
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })  
    .put('/updateUser/:userId', async (req, res) => {
        try {
            const userId = req.params.userId;
            const updates = req.body;
            await User.updateUser(userId, updates);
            res.send("User Updated");
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    .delete('/deleteUser/:userId', async (req, res) => {
        try {
            const userId = req.params.userId;
            await User.deleteUser(userId);
            res.send("User Deleted");
        }
        catch(err) {
            res.status(401).send({message: err.message});
        }
    })
    ;

module.exports = router;