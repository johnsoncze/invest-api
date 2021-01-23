const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
		total: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
		},
		price: {
			type: Number,
			required: true
		},
    date: {
        type: Date,
				required: true
		},
		type: {
			type: String,
			enum: ['BUY', 'SELL'],
			default: 'BUY'
		},
		currency: {
			type: String,
			required: true
		},
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Order model
const Order = module.exports = mongoose.model('order', orderSchema);
module.exports.get = function (callback, limit) {
    Order.find(callback).limit(limit);
}
