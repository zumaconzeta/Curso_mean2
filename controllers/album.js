'use strict'
var path = require ('path');
var fs = require ('fs');
var mongoosePaginate = require('mongoose-pagination') 

var Artist = require ('../models/artist');
var Album = require ('../models/album');
var Song = require ('../models/song');

function getAlbum(req, res){
    var albumId = req.params.id;
    Album.findById(albumId).populate({path:'artist'}).exec((err,album)=>{
        if(err){
            res.status(500).send({message : 'Error en la Peticion'});
        }else{
            if(!album){
                res.status(404).send({message : 'No exite el Album'});
            }else{
                res.status(200).send({album});
            }
        }

    });
}

function saveAlbum(req,res){
    var album= new Album();   
    var params = req.body;

    album.title = params.title; 
    album.descripcion = params.descripcion;
    album.year = params.year;
    album.image = 'null';    
    album.artist = params.artist;

    album.save((err,albumStored) => {
        if (err){
            res.status(500).send({message : 'error en la peticion del servidor'});
        }else{
            if (!albumStored){
                res.status(404).send({message : 'No se ha guardado'});
            }else{
                res.status(200).send({album: albumStored});
            }

        }
    });
}



module.exports = {
    getAlbum,
    saveAlbum
}