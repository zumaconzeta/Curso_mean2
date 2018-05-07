'use strict'
var path = require ('path');
var fs = require ('fs');
var mongoosePaginate = require('mongoose-pagination') 

var Artist = require ('../models/artist');
var Album = require ('../models/album');
var Song = require ('../models/song');

function getSong(req,res){
   var songId = req.params.id;

    Song.findById(songId).populate({path:'album'}).exec((err,song)=>{
        if(err){
            res.status(500).send({message: 'Error en la Petición'});
        }else{
            if (!song){
                res.status(404).send({message: 'No existe la canción'});   
            }else{
                res.status(200).send({song});
            }
        }
    });

}


function getSongs(req,res){
    var albumId = req.params.album;
    if(!albumId){
        var find = Song.find({}).sort('number')
    }else{
        var find = Song.find({album: albumId}).sort('number');
    }
    find.populate({
        path: 'album',
        populate:{
            path: 'artist',
            model: 'Artist'
        }
    }).exec(function(err,songs){
        if(err){
            res.status(500).send({message: 'Error en el servidor '});
        }else{
            if (!songs){
                res.status(404).send({message: 'No existe las canciones'});   
            }else{
                res.status(200).send({songs});
            }
        }
    });
}

function saveSong (req,res){
    var song = new Song();
    var params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;   
    song.save((err,songStored)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor '});            
        }else{
            if(!songStored){                
                res.status(404).send({message: 'No se ha guradado la canción '});
            }else{                
                res.status(200).send({song: songStored});
            }
        }
    });
}

function updateSong (req,res){
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndRemove(songId, update,(err,songRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});            
        }else{
            if(!songRemoved){                
                res.status(404).send({message: 'No se ha actualizado la canción '});
            }else{                
                res.status(200).send({song: songRemoved});
            }
        }
    });

}

function deleteSong(req,res){
    var songId = req.params.id
    Song.findByIdAndRemove(songId,(err,songRemoved)=>{
        if (err){
            res.status(500).send({message: 'Error al eliminar Canción'});
        }else{
            if(!songRemoved){
                res.status(404).send({message: 'La canción no ha sido eliminado'}); 
            }else{
                res.status(200).send({song:songRemoved});
            }

        }
    });
}

function UploadFile (req,res){
    var songId = req.params.id;
    var file_name = 'No Subido...';
    if (req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'mp3' || file_ext == 'ogg'){
            Song.findByIdAndUpdate(songId, {file: file_name},(err,songUpdated)=>{
                if (!songUpdated){
                    res.status(404).send({message: 'no se ha actualizado la cancion'});
                }else{
                    res.status(200).send({song: songUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Tipo de archivo no valido'});
        }

        console.log (file_split);
    }else{
        res.status(200).send({message: 'El audio no se ha subido'});
    }

}

function getSongFile(req,res){
    
    var songFile = req.params.songFile;
    var path_file = './uploads/song/' + songFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe el audio'});
        }

    });
}


module.exports = {
    getSong
    ,saveSong
    ,getSongs
    ,updateSong
    ,deleteSong
    ,UploadFile
    ,getSongFile
}