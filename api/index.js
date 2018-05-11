'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
var atlas = "mongodb://admin:admin@cluster0-shard-00-00-euqmy.mongodb.net:27017,cluster0-shard-00-01-euqmy.mongodb.net:27017,cluster0-shard-00-02-euqmy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
var local = 'mongodb://localhost:27017/curso_mean2';

 //mongoose.Promise = global.Promise;
mongoose.connect(local, (err,res) => {
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
 


