require('dotenv').config()
module.exports = {
	mongo: {
		conn: process.env.DB_MONGO,
	},
	ownInvestment: process.env.OWN_INVESTMENT,
	port: process.env.PORT,
}
