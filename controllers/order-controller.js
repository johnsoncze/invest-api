const config = require('../config')

Order = require('../models/order-model');

exports.index = function (req, res) {
    Order.get(function (err, orders) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Orders retrieved successfully",
            data: orders
        });
    });
};

exports.new = function (req, res) {
    const order = new Order();
    order.total = req.body.total
    order.amount = req.body.amount;
    order.date = req.body.date;
    order.currency = req.body.currency;
    order.type = req.body.type || 'BUY';
		order.price = order.total / order.amount;

		order.save(function (err) {
        if (err)
            res.json(err);
		res.json({
            message: 'New order created!',
            data: order
        });
    });
};

exports.view = function (req, res) {
		console.log(req.params)
    Order.findById(req.params.order_id, function (err, order) {
        if (err)
            res.send(err);
        res.json({
            message: 'Order details loading..',
            data: order
        });
    });
};

// exports.update = function (req, res) {
// Order.findById(req.params.order_id, function (err, order) {
//         if (err)
//             res.send(err);
// 				order.name = req.body.name ? req.body.name : order.name;
//         order.gender = req.body.gender;
//         order.email = req.body.email;
//         order.phone = req.body.phone;
// // save the order and check for errors
//         order.save(function (err) {
//             if (err)
//                 res.json(err);
//             res.json({
//                 message: 'Order Info updated',
//                 data: order
//             });
//         });
//     });
// };

exports.delete = function (req, res) {
    Order.remove({
        _id: req.params.order_id
    }, function (err, order) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Order deleted'
        });
    });
};

exports.getStats = async function (req, res) {
	try {
		const stats = await Order.getStats()
		res.json({
			status: "success",
			message: "Orders stats retrieved successfully",
			data: {
				...stats,
				ownInvestment: config.ownInvestment,
			}
		});
	} catch (err) {
		res.json({
			status: "error",
			message: err,
		});
	}
}
