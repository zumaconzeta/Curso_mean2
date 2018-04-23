'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargas rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//ruta base

// esto es para agregar la /api
app.use('/api', user_routes);
app.use('/api', artist_routes);

/* app.get('/pruebas',function(req, res){
    res.status(200).send({message: 'bienvenido'}) ;
});*/

module.exports = app;