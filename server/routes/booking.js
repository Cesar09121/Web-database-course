const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router
    .post('/createBooking', async (req, res) => {
        try {
            await Booking.createBooking(req.body);
            res.send("Booking Created")
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .get('/getBookings', async (req, res) => {
        try {
            const bookings = await Booking.getBookings();
            res.send(bookings);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .delete('/deleteBooking', async (req, res) => {
        try {
            await Booking.deleteBooking(req.params.booking_id);
            res.send("Booking Deleted");
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .get('/getAllBooking', async (req, res) => {
        try {
            const booking = await Booking.getBookingById(req.params.booking_id);
            res.send(booking);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .put('/updateBooking', async (req, res) => {
        try {
            const bookingId = req.params.booking_id;
            const updates = req.body;
            await Booking.updateBooking(bookingId, updates);
            res.send("Booking Updated");
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .get('/bookingTimes', async (req, res) => {
        try {
            const booking = await Booking.bookingTimes(req.params.booking_id);
            res.send(booking);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    

module.exports = router;