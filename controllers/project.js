'use strict'
var fs = require('fs');
var path = require('path');
var Project = require('../model/project');
var controller ={
    home: function(req,res) {

        return res.status(200).send({
            message: 'Pagina'
        });

    },
    test: function(req,res){

        return res.status(200).send({
            message: 'Pagina de test'
        });

    },
    saveProject: function(req,res){

        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = "null";

        project.save((err,projectStored)=>{
            if (err) return res.status(500).send({message: "Error al desar el document"});

            if (!projectStored) return res.status(404).send({message: 'Document no desat'});

            return res.status(200).send({project: projectStored});

        });
    },
    getProject: function (req,res){
        var projectId = req.params.id;
        console.log(projectId);

        if (projectId == null ) return res.status(500).send({message: "No has especificat cap projecte"});
        else{

            Project.findById(projectId, (err,project) =>{

                if(err) {
                    console.log(err);
                    return res.status(500).send({message:"Error al retornar les dades"});
                }

                if(!project) return res.status(404).send({message: "El projecte no existeix"});

                return res.status(200).send({
                    project
                });

            });
        }
    },
    getProjects: function(req,res){
        Project.find({}).exec((err,project) =>{

            if(err) {
                console.log(err);
                return res.status(404).send({message:"Error al retornar les dades"});
            }

            if(!project) return res.status(404).send({message: "El projecte no existeix"});

            return res.status(200).send({
                project
            });

        });
    },
    updateProject: function (req,res){
        var projectId = req.params.id;

        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, (err,projectUpdated)=>{
            if (err) {
                return res.status(500).send({message:"Error actualizan dades"});

            }
            if (!projectUpdated) return res.status(404).send({message:"No existeix el projecte"});
            return res.status(200).send({
                project: projectUpdated
            });
        })
    },
    deleteProject: function (req,res){
        //el valor de la id arriba per la URL
        var projectId = req.params.id;
        Project.findByIdAndDelete(projectId, (err, projectRemoved) =>{
            if (err) {
                return res.status(500).send({message: "Error: no s'ha pogut borrar el projecte"});
            }
            if (!projectRemoved) return res.status(404).send({message: "No existeix el projecte a borrar"});
            return res.status(200).send({
                project: projectRemoved
            })
        });
    },
    uploadImage: function(req,res){
        var projectId = req.params.id;
        var fileName = "Imatge no pujada";
        

        if (req.files){
            
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            //console.log(fileSplit);
            var fileName = fileSplit[1];
            var fileSplit2 = fileName.split('.');
            var fileName2 = fileSplit2[1];
            console.log(fileName2);
            console.log(fileName);
            console.log(projectId);
            if (fileName2=="png" || fileName2=="jpg" || fileName2=="jpeg" || fileName2=="giff"){
                console.log("Extensió correcte");
            }
            else{
                    fs.unlink(filePath, (err) =>{
                    return res.status(200).send({message: "L'extensió no es correcta"});
                })
            }
            console.log(projectId);
            console.log(fileName);
            Project.findByIdAndUpdate(projectId, {image:fileName}, {new:true}, (err, projectUpdated)=>{
                //console.log(projectUpdated);
                if (err){
                    return res.status(500).send({message:"Error actualitzant la imatge"});
                }
                if (!projectUpdated) return res.status(404).send({message:"No existeix el projecte"});
                return res.status(200).send({
                    project: projectUpdated
                });
            });
        }else{
            return res.status(500).send({
                message: fileName
            })
        }
    },
    getImage: function (req,res){
        //console.log(req.params.image);
        var file = req.params.image;
        console.log(file);
        var path_file = './uploads/'+file;
        console.log(path_file);

        fs.exists(path_file, (exists) =>{
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No hi ha la imatge"
                });
            }
        });
    }
};

module.exports = controller;