const Order = require('../models/Orders');

module.exports.display_order_data = async function(req, res){
    let data = req.body.order_data;
    await data.splice(0, 0, {Order_date: req.body.order_date});

    let eId = await Order.findOne({'email': req.body.email});

    if(eId == null){
        try {
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

}

module.exports.display_my_order_data = async function(req, res){
    try{
        let myData = await Order.findOne({'email':req.body.email});
        res.json({orderData:myData});
    }
    catch(err){
        res.send("Server error", error.message);
    }
}