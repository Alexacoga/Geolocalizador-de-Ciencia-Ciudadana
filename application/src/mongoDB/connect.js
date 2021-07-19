const mongoose = require('mongoose');
//Connect to MongoDB database
mongoose.connect('mongodb://localhost/CienciaCiudadana', 
{ useUnifiedTopology: true, useNewUrlParser: true }, //set by default, ensure it to avoid warnings
);

mongoose.connection.once('open', function() { //once for the first connection try
    console.log('Connected successfully to the MongoDB!');
}).on('error', function(error) { //with on controls everytime if there is an error
    console.log('Connection error: ', error);
});
