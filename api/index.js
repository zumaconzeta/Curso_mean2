'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err,res) => {
    if(err){
        //throw err;
        console.log('problema con la conexion con MongoDB');
    }else{
        console.log('Todo marcha sobre ruedas desde pundo vista MongoDB');

        app.listen(port,function(){
            console.log("Servidor del api escuchando al puerto: " + port);
        });
    }
});
