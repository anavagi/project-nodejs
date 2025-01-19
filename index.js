'use strict'

var mongoose =require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio')
    .then(()=> {
        console.log("Connexio a la BD establerta");

        //creacio del servidor
        app.listen(port, ()=>{
            console.log('Servidor funcionant correctament');
        } );
    })
    .catch (err=> console.log(err));