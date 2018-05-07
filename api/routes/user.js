'use strict'

var express = require ('express');
var userController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'});

api.get('/probando-controlador',md_auth.ensureAuth, userController.pruebas);
api.get('/getPrueba', userController.getPrueba);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,userController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],userController.uploadImage);
api.get('/get-image-user/:imageFile',userController.getImageFile);

module.exports = api;
