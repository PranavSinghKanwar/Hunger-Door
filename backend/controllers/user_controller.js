const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "ubvkjrebviuwbvuibbkjreivb";

module.exports.create_user = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try{
        let email = req.body.email;
        let found_user = await User.findOne({email});
        if(found_user){
            return res.status(400).json({errors:"This email is already signed up"});
        }
        else{
            const user_created = await User.create({
                name: req.body.name,
                password: secPassword,
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
            const pwdCompare = await bcrypt.compare(req.body.password, found_user.password);
            if(!pwdCompare){
                return res.status(400).json({errors:"Incorrect email/password"});
            }
            else{
                const data = {
                    user:{
                        id: found_user.id
                    }
                }
                const authToken = jwt.sign(data, jwtSecret);
                return res.json({success:true, authToken:authToken});
            }
        }
    }
    catch(err){
        console.log("error in logging in: ", err);
    }
}