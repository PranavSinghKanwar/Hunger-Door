const mongoose = require("mongoose");
const env = require("./environment");
const mongoURI = env.db_uri;
async function db() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB!!!');
        const fetched_data = await mongoose.connection.db.collection("food-items");
        const hold = await fetched_data.find({}).toArray();

        const fetched_food_cat = await mongoose.connection.db.collection("food-categories");
        const holdCat = await fetched_food_cat.find({}).toArray();
        if(hold.length == 0){
            console.log('No docs');
        }
        else{
            global.food_items = hold;
            global.foodCategory = holdCat;
        }
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

module.exports = db;
