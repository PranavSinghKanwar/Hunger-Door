const express = require("express");
const router = express.Router();
const foodController = require('../controllers/food_controller');

router.post('/foodData', foodController.display_data);

module.exports = router;