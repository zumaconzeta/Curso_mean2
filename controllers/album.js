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

function getAlbums(req,res){
       var artistId= req.params.artist;   
    if(!artistId){
        var find = Album.find({}).sort('title');       
    }else{        
        var find = Album.find({artist: artistId}).sort('year');      
    }
    find.populate({path:'artist'}).exec((err,albums)=>{
        if (err){
            res.status(500).send({message : 'error en la peticion del servidor'});        
        }else{
            if(!albums){
            res.status(404).send({message : 'no hay albums'});
            }else{
                res.status(200).send(albums);        
            }
        }
    });
}

function updateAlbum(req,res){
    var albumId = req.params.id;
    var update = req.body;
    Album.findByIdAndUpdate(albumId, update, (err,albumUpdated)=>{
        if (err){
            res.status(500).send({message : 'error en la peticion del servidor'});        
        }else{
            if(!albumUpdated){
            res.status(404).send({message : 'No se ha Actualizado el Album'});
            }else{
                res.status(200).send({album: albumUpdated});
            }
        }
    });

    

}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum
}