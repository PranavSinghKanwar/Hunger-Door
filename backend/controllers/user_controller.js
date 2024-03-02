const User = require('../models/User');
const {body, validationResult} = require('express-validator');

module.exports.create_user = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        let email = req.body.email;
        let found_user = await User.findOne({email});
        if(found_user){
            return res.status(400).json({errors:"This email is already signed up"});
        }
        else{
            const user_created = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location
            });
            res.json({success:true});
        }  
    }
    catch(err){
        console.log("error in creating user: ", err);
        res.json({success:false});
    }
}

module.exports.login_user = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        let email = req.body.email;
        let found_user = await User.findOne({email});
        if(!found_user){
            return res.status(400).json({errors:"Incorrect email/password"});
        }
        else{
            if(req.body.password !== found_user.password){
                return res.status(400).json({errors:"Incorrect email/password"});
            }
            else{
                return res.json({success:true});
            }
        }
    }
    catch(err){
        console.log("error in logging in: ", err);
    }
}