'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
/*----------------------cors---------------------------------*/
app.use ((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});
/*----------------------carregar rutes---------------------------------*/

var project_routes = require('./routes/project');

/*----------------------middlewares---------------------------------*/

/*---------------------codifiquem a json tot el que ens arriba------------------*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


/*---------------------rutes---------------------------------*/

app.use('/api',project_routes);

/*---------------------exportar---------------------------------*/
module.exports =app;