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
    album.description = params.description;
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
                res.status(200).send({albums: albums});        
            }
        }
    });
}

function updateAlbum(req,res){
   
    var albumId = req.params.id;
    var update = req.body;
    Album.findByIdAndUpdate(albumId, update, (err,albumUpdated)=>{
        if (err){
           // console.log (err);
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

function deleteAlbum(req,res){
    var albumId = req.params.id;
    Album.findByIdAndRemove(albumId,(err,albumRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar album'});
        }else{
            if(!albumRemoved){
                res.status(404).send({message: 'El album no ha sido eliminado'}); 
            }else{
                Song.find({album:albumRemoved._id}).remove((err,songRemoved)=>{
                    if(!err){
                        res.status(500).send({message: 'Error al eliminar la cancion'});
                    }else{
                        if(!songRemoved){
                            res.status(404).send({message: 'La Cancion no ha sido eliminado'}); 
                        }else{
                            res.status(200).send({album:albumRemoved});
                        }
                        
                    }
                    
                });                 
            }
        }
    });                 
}

function UploadImage (req,res){
    var albumId = req.params.id;
    var file_name = 'No Subido...';
    if (req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'gif'){
            Album.findByIdAndUpdate(albumId, {image: file_name},(err,albumUpdated)=>{
                if (!albumUpdated){
                    res.status(404).send({message: 'no se ha actualizado el Album'});
                }else{
                    res.status(200).send({Artist: albumUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Tipo de archivo no valido'});
        }

        console.log (file_split);
    }else{
        res.status(200).send({message: 'la imagen no se ha subido'});
    }

}

function getImageFile(req,res){
    //res.status(200).send({message: 'funciona'});
    var imageFile = req.params.imageFile;
    var path_file = './uploads/album/' + imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }

    });
}


module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    UploadImage,
    getImageFile
}