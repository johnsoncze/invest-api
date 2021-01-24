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
module.exports.get = function (callback, offset, limit) {
    Order.find(callback).sort({'date': -1}).skip(offset).limit(limit);
}

const getSumByType = async function (type) {
	const docs = await Order.aggregate([
		{$match: { type }},
		{$group: { _id: null, amount: { $sum: "$amount" } }},
	]).exec()
	return docs[0].amount
}

const getSumFiatByType = async function (type) {
	const docs = await Order.aggregate([
		{$match: { type }},
		{$group: { _id: null, amount: { $sum: "$total" } }},
	]).exec()
	return docs[0].amount
}

module.exports.getStats = async function () {
	const bought = await getSumByType('BUY')
	const sold = await getSumByType('SELL')
	const spent = await getSumFiatByType('BUY')
	const earned = await getSumFiatByType('SELL')
	return {bought, sold, spent, earned, avgPrice: spent/(bought-sold)}
}
