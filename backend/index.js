const express = require('express');
const db = require('./config/mongoose');
const app = express();
const port = 5000;

db();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.json());
app.use('/api', require('./routes/create_user'));
app.use('/api', require('./routes/login_user'));
app.use('/api', require('./routes/display_data'));
app.use('/api', require('./routes/order_data'));
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log('Server listening on port 5000');
})