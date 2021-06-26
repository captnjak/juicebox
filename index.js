const PORT = 3000;

/** Require Statements **/
require('dotenv').config();

const express = require('express');
const server = express();

const { client } = require('./db');
client.connect();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const apiRouter = require('./api');
server.use('/api', apiRouter);


/** Body Loggers **/
server.use((req, res, next) => {
	console.log('<____Body Logger START____>');
	console.log(req.body);
	console.log('<_____Body Logger END_____>');

	next();
});

/** Start Server **/
server.listen(PORT, () => {
	console.log('The server is up on port', PORT);
});
