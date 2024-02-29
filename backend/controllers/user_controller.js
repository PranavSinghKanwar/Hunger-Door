const User = require('../models/User');
const {body, validationResult} = require('express-validator');

module.exports.create_user = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const user_created = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location
        });
        res.json({success:true});
    }
    catch(err){
        console.log("error in creating user: ", err);
        res.json({success:false});
    }
}