const express = require("express");
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/user_controller');
const {body, validationResult} = require('express-validator');



router.post("/login_user",[body('email').isEmail()] , userController.login_user);

module.exports = router;