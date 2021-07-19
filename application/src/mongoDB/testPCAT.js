require('../../mongodb.js'); //start connection to DB

//import of the model
const ProyectosImportadosCAT = require('./models/proyectosCAT.js');

//Lectura completa DB, busca todos
ProyectosImportadosCAT.find( function (error, data) {
    if (error){
        console.error(error)
    } else {
        for(var i = 0; i < data.length; i++) {
            console.log("Data project "+ (i+1), data[i]);
        } 
    }
});


//Escritura a DB de un ejemplo de proyecto
var project = new ProyectosImportadosCAT({
    TITLE: "Proyecto Prueba",
    DESCRIPTION: ["Esta es una prueba por Alex."]
});

project.save(function (error, res) {
    if (error) return console.error(error);
    else {
        console.log("Project " + res + " has been saved.");
    }
});

//otra manera
// project.save().then(result=>{
//     console.log(result);
// }).catch(error=>console.log(error) );

//Lectura del proyecto guardado
ProyectosImportadosCAT.find( {TITLE: "Proyecto Prueba"}, function (error, data) {
    if (error){
        console.error(error)
    } else {
        console.log("Found Project: ", data);
    }
});