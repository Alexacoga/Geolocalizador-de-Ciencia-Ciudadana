//Connect to MongoDB and create the desired schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectosCAT = new Schema( {
    //_id: mongoose.Schema.Types.ObjectId, //set by default, no need to specify
    TITLE: String,
    DESCRIPTION: Array,
    WEB: Array,
    'Url platform': mongoose.Schema.Types.Mixed,
    // 'Plat Id': String,
    // 'Plat country': String,
    // 'Insert date': String,
    // 'Wp2 Id': Number, //realmente es Int32
    Language: String
  },
  { versionKey: false }  //avoid versioning when saving ( __v )
);
//                                                                                    *the collection name
const ProyectosImportadosCAT = mongoose.model('ProyectosImportadosCAT', ProjectosCAT, 'ProyectosImportadosCAT');

//we export this to be able to use it in other files
module.exports = ProyectosImportadosCAT;