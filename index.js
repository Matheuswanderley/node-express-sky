require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const enviroment = process.env.NODE_ENV;
const stage = require('./config')[enviroment];
const routes = require('./routes/index');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if(enviroment !== 'production'){
    app.use(logger('dev'));
}

app.use('/api/v1', routes(router));

const porta = process.env.PORT || 8080;
app.listen(porta);

module.exports = app;