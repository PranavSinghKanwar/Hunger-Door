const express = require("express");
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/user_controller');
const {body, validationResult} = require('express-validator');

router.post('/create_user',[body('email').isEmail(), body('name').isLength({min:5}), body('password').isLength({min:5})] , userController.create_user);

module.exports = router;