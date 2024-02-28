const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://pranavkanwar4:impranav@cluster0.n72uogl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function db() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

module.exports = db;