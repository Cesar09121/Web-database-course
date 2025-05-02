const express = require('express');
const router = express.Router();
const Service = require('../models/services');

router
    .get('/createServiceTable', async (req, res) => {
        try {
            await Service.createTable();
            res.send("Service Table Created");
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .post('/createService', async (req, res) => {
        try {
            await Service.createService(req.body);
            res.send("Service Created");
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .get('/getAllServices', async (req, res) => {
        try {
            const services = await Service.getAllServices();
            res.send(services);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .get('/getService/:service_id', async (req, res) => {
        try {
            const service = await Service.getService(req.params.service_id);
            res.send(service);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .put('/updateService/:service_id', async (req, res) => {
        try {
            const serviceId = req.params.service_id;
            const updates = req.body;
            await Service.updateServiceSummary(serviceId, updates);
            res.send("Service Updated");
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .delete('/deleteService/:service_id', async (req, res) => {
        try {
            await Service.deleteService(req.params.service_id);
            res.send("Service Deleted");
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    .get('/serviceExists/:service_name', async (req, res) => {
        try {
            const exists = await Service.serviceExists(req.params.service_name);
            res.send({ exists });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    });

module.exports = router;