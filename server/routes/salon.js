const express = require('express');
const router = express.Router();
const Booking = require('../models/salon');

router
    .get('/createSalonTable', async (req, res) => {
        try {
            await Booking.createTable();
            res.send("Salon Table Created")
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .post('/createSalon', async (req, res) => {
        try {
            await Booking.createSalon(req.body);
            res.send("Salon Created")
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .get('/getSalons', async (req, res) => {
        try {
            const salons = await Booking.getSalons();
            res.send(salons);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .delete('/deleteSalon/:salon_id', async (req, res) => {
        try {
            await Booking.deleteSalon(req.params.salon_id);
            res.send("Salon Deleted");
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    });

    
module.exports = router;