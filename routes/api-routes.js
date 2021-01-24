const router = require('express').Router();

const orderController = require('../controllers/order-controller')

router.route('/orders')
    .get(orderController.index)
    .post(orderController.new);
router.route('/orders/stats')
    .get(orderController.getStats)

router.route('/orders/:order_id')
    .get(orderController.view)
    .delete(orderController.delete);

module.exports = router;
