'use strict'

var express = require ('express');
var ArtistController = require('../controllers/artist');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/getPrueba2', ArtistController.getPrueba);

api.get('/artist/:id',md_auth.ensureAuth, ArtistController.getArtist);
api.post('/artist',md_auth.ensureAuth, ArtistController.saveArtist);

module.exports= api;