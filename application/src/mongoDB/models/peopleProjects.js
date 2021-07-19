//Connect to MongoDB and create the desired schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleProjectSchema = new Schema({
    TITLE: { type: String, required: true },
    DESCRIPTION: { type: Array, required: true },
    OBJECTIVES: { type: Array, required: true },
    TASKS: { type: Array, required: true },
    TOOLS: String,
    'MAIN PROGRAM OR PERSON IN CHARGE': { type: String, required: true },
    'CONTACT INFO': String,
    'DEVELOPMENT SPACE': String,
    'NUMBER OF MEMBERS': String,
    'Project web' : { type: String, required: true },
    WEB: Array, //other related webs
    LOCATION: { type: String, required: true },  //adress or approximate city doing the project (to locate the markers)
    Language: String,
    PRESENTIAL: String,
    'START DATE': String,
    'END DATE': String,
    TOPICS: Array,
    EVENTS: Object
}, 
{ versionKey: false }  //avoid versioning when saving ( __v )
);

//                             *default the collection name = Model name, also can be added at the end to specify
const PeopleProjects = mongoose.model('PeopleProjects', PeopleProjectSchema, 'PeopleProjects');

//Añadir si tiene SCHEMANAME.methods.NAME (function(){} ); si los tiene  

//we export this to be able to use it in other files in this project
module.exports = PeopleProjects;
