// Import express
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const apiRoutes = require("./routes/api-routes");
const config = require('./config')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect(config.mongo.conn, { useNewUrlParser: true});
const db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

const port = config.port || 8080;

app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api', apiRoutes);
app.listen(port, function () {
    console.log("Running Invest api on port " + port);
});
