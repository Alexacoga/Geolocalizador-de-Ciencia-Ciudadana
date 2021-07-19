//Connect to MongoDB and create the desired schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectosES = new Schema( {
    //_id: mongoose.Schema.Types.ObjectId, //set by default, no need to specify it
    TITLE: String,
    DESCRIPTION: Array,
    WEB: Array,
    'Url platform': mongoose.Schema.Types.Mixed,
    'GEOGRAPHICAL LOCATION': Array,
    'START DATE': String,
    'END DATE': String,
    Language: String,    
    TOPICS: Array,
  },
  { versionKey: false }  //avoid versioning when saving ( __v )
);
//                                                                                 *the collection name
const ProyectosImportadosES = mongoose.model('ProyectosImportadosES', ProjectosES, 'ProyectosImportadosES');

//we export this to be able to use it in other files
module.exports = ProyectosImportadosES;