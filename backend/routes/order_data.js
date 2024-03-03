const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order_controller");

router.post('/orderData', orderController.display_order_data);

router.post('/myOrderData', orderController.display_my_order_data);

module.exports = router;