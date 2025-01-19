'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

//cal configurar un middleware (s'executará abans de que s'executi la ruta)
var multipart = require('connect-multiparty');
//li hem de pasar la carpeta alla on es desaran els arxius
var multipartMiddleware = multipart({uploadDir: './uploads'})

router.get('/home', ProjectController.home);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.get('/get-image/:image',ProjectController.getImage); //agafem el nom de la image pujada


router.post('/test', ProjectController.test);
router.post('/save-project',ProjectController.saveProject);

//per actualitzar ultilizarem put
router.put('/project/:id', ProjectController.updateProject); 

//per eliminar utilitzarem delete
router.delete('/delete-project/:id', ProjectController.deleteProject); 

//ruta per pujar una imatge, cal indicar el middleware que volem que s'executi
router.post('/upload-image/:id',multipartMiddleware,ProjectController.uploadImage);

module.exports = router;

