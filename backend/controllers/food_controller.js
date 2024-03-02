
module.exports.display_data = async function(req, res){
    try{
        res.send([global.food_items, global.foodCategory]);
    }
    catch(err){
        console.log('error in displaying food items: ', err);
    }
}