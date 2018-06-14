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
    var itemsPerPage = 4;

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
                Album.find({artist:artistRemoved._id}).remove((err,albumRemoved)=>{
                    if(!err){
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


function UploadImage (req,res){
    var artistId = req.params.id;
    var file_name = 'No Subido...';
    if (req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'gif'){
            Artist.findByIdAndUpdate(artistId, {image: file_name},(err,artistUpdated)=>{
                if (!artistUpdated){
                    res.status(404).send({message: 'no se ha actualizado el Artista'});
                }else{
                    res.status(200).send({Artist: artistUpdated});
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
    var path_file = './uploads/artists/' + imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
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
        deleteArtist,
        UploadImage,
        getImageFile
};