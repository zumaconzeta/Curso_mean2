'use strict'

var express = require ('express');
var songController = require('../controllers/song');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/song'});

api.get('/song', songController.getSong);

module.exports= api;