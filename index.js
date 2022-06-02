const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
require('dotenv').config()
const client = require('./database')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./router"));

app.use(function (req, res, next) {
    res.status(404).send('Desculpe, não encontramos!');
});

app.use(function (err, req, res, next) {
    res.status(500).send('Aconteceu algum erro no servido! Error: ', err.stack);
});

app.listen(process.env.PORT || port);