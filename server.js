'use strict'
//HEADER
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8085;
var MYSQL_MICROSERVICE = process.env.MYSQL_MICROSERVICE || null;
var CURRENCY_MICROSERVIE = process.env.CURRENCY_MICROSERVIE || null;
//BODY
var app = express();
app.use(bodyParser.json());
app.use(express.static('./js'));
app.use(express.static('./css'));
app.get('/', function (req, res) {
    res.send('index.html')
})
app.listen(PORT, function () {
    console.log('listening on port ' + PORT)
});