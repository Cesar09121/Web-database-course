const express = require('express');
const User = require('./models/user');
const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = User.getUsers();
        res.send(users);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to fetch users' });
    }       
}
);