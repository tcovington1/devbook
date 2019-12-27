// bring in express
const express = require('express');
const connectDB = require('./config/db');


const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

                            // sends data to the browser
app.get('/', (req, res) => res.send('API Running'));

// Define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// look for port to get the port number, if none it dfaults to 5000
const PORT = process.env.PORT || 5000;

                 // call back to let us know it was connected
app.listen (PORT, () => console.log(`Server started on port ${PORT}`));