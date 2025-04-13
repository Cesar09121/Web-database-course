const express = require('express');
const User = require('./models/user');
const app = express();
const userRoutes = require('./server/routes/user');


app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});




