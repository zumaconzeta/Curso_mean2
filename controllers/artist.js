'use strict'
var path = require ('path');
var fs = require ('fs');
var mongoosePaginate = require('mongoose-pagination') 

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

function getArtists(req,res){
    if(req.params.page){        
    var page = req.params.page;
    }else{
        var page =1;
    }
    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage,function(err,artists,total){
        if(err){
            res.status(500).send({message: 'Error en la peticion '});
        }else{
            if(!artists){
                res.status(404).send({message: 'No hay artista '});
            }else{
                return res.status(200).send({
                    Total_Items : total,
                    artists: artists
                });
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

function updateArtist(req,res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId,update,(err,artistUpdated)=>{
        if (err){
            res.status(500).send({message: 'Error en la peticion '});
        }else 
            if(!artistUpdated){
                res.status(404).send({message: 'El artista no ha sido actualizado '});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
    });
}

function deleteArtist(req,res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId,(err,artistRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar el artista'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message: 'El artista no ha sido eliminado '});
            }else{
                Album.find({artist:artistRemoved._id}).remove((err,albumRmoved)=>{
                    if(!err){
                        res.status(500).send({message: 'Error al eliminar album'});
                    }else{
                        if(!albumRmoved){
                            res.status(404).send({message: 'El album no ha sido eliminado'}); 
                        }else{
                            Song.find({album:albumRmoved._id}).remove((err,songRemoved)=>{
                                if(!err){
                                    res.status(500).send({message: 'Error al eliminar la cancion'});
                                }else{
                                    if(!songRemoved){
                                        res.status(404).send({message: 'La Cancion no ha sido eliminado'}); 
                                    }else{
                                        res.status(200).send({artist:artistRemoved});
                                    }
                                    
                                }
                                
                            });                 
                        }
                    }
                });                 
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
        saveArtist,
        getArtists,
        updateArtist,
        deleteArtist
};