const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 5000;

db();
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log('Server listening on port 5000');
})