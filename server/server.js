// Step 1 import package
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')

// Configuration
const PORT = process.env.PORT || 3000;
const fs = require('fs')

// Step 4 Use Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Step 3 route
// const usersRouter = require('./routes/users.route.js')
// app.use('/api', usersRouter)
fs.readdirSync('./routes').map((item) => {
    app.use("/api", require(`./routes/${item}`))
})


// Step 2 Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))