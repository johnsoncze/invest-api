require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true});
const db = mongoose.connection;
if(!db)
	console.log("Error connecting db")
else
	console.log("Db connected successfully")

const orders = [
	['2017-11-28',499.99,0.00233725,213922.3446],
].map((o) => {
	return {
		date: new Date(o[0]),
		total: o[1],
		amount: o[2],
		price: o[3],
		currency: 'BTC'
	}
})
console.log(orders)
Order = require('./orderModel');
Order.insertMany(orders, (err) => {
	console.log(err)
	process.exit()
})
