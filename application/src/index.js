const express = require('express');
const router = express.Router();    //in charge of handling operations

var savedPorjects = []; //will contain all the database projects

//default intruction is to render the main web, home page
router.get('/', (req, res) => {
    res.render('index', {title: "Geolocalizador CC"}); //teniendo el path a las views ya configurado solo le indico el fichero
});

router.get('/addProjects', (req, res) => {
    res.render('projectsForm', {title: "Añadir proyecto"});
});

router.get('/seeProjects', async function (req, res) {
    savedPorjects = []; //reset the saved projects
    //find all saved projects in each model
    await findProjects('./mongoDB/models/peopleProjects.js');
    await findProjects('./mongoDB/models/proyectosCAT.js');
    await findProjects('./mongoDB/models/proyectosES.js');
    
    console.log(`Logged ${savedPorjects.length} projects to show.`);
    res.render('projectsMap', {title: "Mapa de proyectos", projects: JSON.stringify(savedPorjects) });
});

router.post('/add', (req, res) => {
    const PeopleProjects = require('./mongoDB/models/peopleProjects.js');    
    let project = req.body; //project will be filled with the form data (not directly due to the events indirect part)

    //Change the incoming values to the correct form
    //split the strings into arrays
    project.DESCRIPTION = project.DESCRIPTION.split('\n');
    project.OBJECTIVES = project.OBJECTIVES.split('\n');
    project.TASKS = project.TASKS.split('\n');
    project.WEB = project.WEB.split(',');
    project.TOPICS = project.TOPICS.split(',');

    //if any of the events parts are available then add the object
    if(project['event-name'] || project['event-description'] || project['event-material'] || 
       project['event-start-date'] || project['event-end-date'] || project['event-class']
       || project['event-presentiality'] || project['event-duration']) {
        project.EVENTS = {};
        project.EVENTS.name = project['event-name'];
        project.EVENTS.description = project['event-description'];
        project.EVENTS.material = project['event-material'];
        project.EVENTS.startDate = project['event-start-date'];
        project.EVENTS.endDate = project['event-end-date'];
        project.EVENTS.class = project['event-class'];
        project.EVENTS.presentiality = project['event-presentiality'];
        project.EVENTS.duration = project['event-duration'];

        //delete empty events (case adding innecesary)
        if (typeof project.EVENTS.name === 'string') { //case type String (only one entry)
            if (project.EVENTS.name && project.EVENTS.description 
            && project.EVENTS.startDate && project.EVENTS.endDate
            && project.EVENTS.class && project.EVENTS.presentiality) {} //test required elements
            else {
                project.EVENTS = {};
            }
        } else { //case type array (entry multiples events)
            for (let index = 0; index < project.EVENTS.name.length; index++) { //used any of the project
                if (project.EVENTS.name[index] && project.EVENTS.description[index] 
                && project.EVENTS.startDate[index] && project.EVENTS.endDate[index]
                && project.EVENTS.class[index] && project.EVENTS.presentiality[index]) {} //test required elements
                else {
                    project.EVENTS.name.splice(index, 1);
                    project.EVENTS.description.splice(index, 1);
                    project.EVENTS.material.splice(index, 1);
                    project.EVENTS.startDate.splice(index, 1);
                    project.EVENTS.endDate.splice(index, 1);
                    project.EVENTS.class.splice(index, 1);
                    project.EVENTS.presentiality.splice(index, 1);
                    project.EVENTS.duration.splice(index, 1);
                    index--; //since removing moves forward nexts values 1 position in the array
                }
            }
            if (project.EVENTS.name.length == 0) { //case any entry completed
                project.EVENTS = {};
            }
        }
    }

    project = new PeopleProjects(project); //update it to the schema format
    project.save(function (error, re) {
        if (error) return console.error(error);
        else {
            console.log("Project " +re+ " has been saved.");
        }
    });
    res.redirect('/addProjects');
});

router.get('/info', function(req, res) {    //extra defined page with specific information
    res.send('Alex Acosta Garcia - TFG Project: "Aplicativo de Geolocalización de ciencia ciudadana" ');
});

module.exports = router;

// Functions
async function findProjects(model) { //search for the projects in a model
    const SavedProjects = require(model);
    await SavedProjects.find( function (error, data) { //await in order to do next after this
        if (error) {    //en caso de rror lo muestra y se queda con los proyectos que tuviese antes si los sigue teniendo
            console.error(error)
        } else {
            for(var i = 0; i < data.length; i++) {
                savedPorjects.push(data[i]);
                //console.log(savedPorjects[i]); //debugg to see them
            }
        }
    });
}