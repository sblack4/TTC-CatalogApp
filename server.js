
'use strict'

var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 8084
var CATALOG_MICROSERVICE_URL = process.env.CATALOG_MICROSERVICE_URL || "http://localhost:8085/catalog";
var CURRENCY_MICROSERVICE_URL = process.env.CURRENCY_MICROSERVICE_URL || "http://localhost:8089/currenciesFromUSD";

var app = express()

app.use(bodyParser.json());
app.use(express.static(__dirname))

app.get('/', function(req,res){
	res.send('index.html')
})

app.get('/catalog', function (req, res) {
    console.log('/cataog api called');
    http.get(CATALOG_MICROSERVICE_URL, function (resp) {
        const statusCode = resp.statusCode;
        console.log('Catalog status code ' + statusCode)
        var body = '';
        //if okay
        if(statusCode == 200){
            resp.on('data', function (chunk) {
                body += chunk;
            });
            resp.on('end', function () {
                var jsonResponse = JSON.parse(body);
                res.send(jsonResponse)
            });
        }
        else if(statusCode == 500){ //Internatl server error
            res.send([]);
        } 
        else{ //no response
            res.send(null);
        }
    }).on('error', function (e) {
        console.log("Got an error: ", e);
        res.send(null)
    });
});

app.get('/currencyExchange', function (req, res) {
    console.log('/currencyExchange api called');
    http.get(CURRENCY_MICROSERVICE_URL, function (resp) {
        const statusCode = resp.statusCode;
        console.log('CurrencyExchange status code ' + statusCode)
        if(statusCode == 200){
            var body = '';
            resp.on('data', function (chunk) {
                body += chunk;
            });
            resp.on('end', function () {
                var jsonResponse = JSON.parse(body);
                res.send(jsonResponse)
            });
        }else{
            res.send(null);
        }
        
    }).on('error', function (e) {
        console.log("Got an error: ", e);
        res.send([])
    });
});


app.listen(PORT, function () {
    console.log('listening on port ' + PORT)
});