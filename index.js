const express = require('express');
const path = require('path');
const app = express();


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something broke!' })
})


// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

const userRoutes = require("./server/routes/user");
const serviceRoutes = require("./server/routes/services");
const bookingRoutes = require("./server/routes/booking");

// Make sure these are mounted properly

app.use("/user", userRoutes);
app.use("/services", serviceRoutes);
app.use("/booking", bookingRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!!`));