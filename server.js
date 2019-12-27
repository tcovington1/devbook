// bring in express
const express = require('express');


const app = express();

                            // sends data to the browser
app.get('/', (req, res) => res.send('API Running'));

// look for port to get the port number, if none it dfaults to 5000
const PORT = process.env.PORT || 5000;

                 // call back to let us know it was connected
app.listen (PORT, () => console.log(`Server started on port ${PORT}`));