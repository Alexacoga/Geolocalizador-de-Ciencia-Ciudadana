require('./mongodb'); //ejecuto el fichero en el que se inicia conexión primero

const assert = require('assert');
const PeopleProjects = require('./models/peopleProjects');
const mongoose = require('mongoose'); //for the ObjectId

var project = new PeopleProjects({
    _id: mongoose.Types.ObjectId(),
    name: 'TFG'
});

//save it to the DB (save is assyncronous, cannot chaeck with assert but has a then method)
project.save(function (err, data) {
    if (err) return console.error(err);
    console.log("The Object " + data + " has been saved.");
});

// .then(function(){
//     assert(project.isNew === false); //has a parameter that tells if it is new until is in the DB, then is not new anymore
//     done(); //this passed parameter tells explicitly when it finished
// });
