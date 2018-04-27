'use strict'
var path = require ('path');
var fs = require ('fs');

var Artist = require ('../models/artist');
var Album = require ('../models/album');
var Song = require ('../models/song');

function getArtist(req, res){
    var artistId = req.params.id;
    Artist.findById(artistId,(err,artist)=>{
        if(err){
            res.status(500).send({message: 'Error en la peticion '});
        }else{
            if (!artist){
                res.status(404).send({message: 'el artista no existe'});
            }else{
                res.status(200).send({artist});
            }
        }
    });  
}

function saveArtist (req,res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image= 'null';


    artist.save((err,artistSored) =>{
        if (err){
            res.status(500).send({message:'Error al guardar el artista'});
        }else{
            if(!artistSored){
                res.status(404).send({message:'El artista no ha sido giuardado'});
            }else{
                res.status(200).send({artist: artistSored});
            }
        }
    });
}

function getPrueba(req,res){
    res.status(200).send({message: 'Esto es una prueba2'});
}

module.exports ={
        getPrueba,
        getArtist,
        saveArtist
};