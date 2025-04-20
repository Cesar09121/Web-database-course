const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

// Routes - using forward slashes instead of backslashes
const userRoutes = require("./server/routes/user");
const serviceRoutes = require("./server/routes/services");

// Make sure these are mounted properly
app.use("/users", userRoutes);
app.use("/services", serviceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!!`));