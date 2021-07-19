const express = require('express');
const app = express();

//const path = require('path');       //web files path: para obtener el path general del proyecto
const morgan = require('morgan');   //server side-tool: permite ver que esta pidiendo cada usuario

// settings
app.set('port', process.env.PORT || 3000);  //case in developing in a server with a fixed port, else 3000
app.set('views', __dirname + '\\public\\views');    //define the views path in order to let the server know it
app.set('view engine', 'ejs');  //and its engine, without need to write .ejs after
//set publics with "shortcut" each folder in public, to let the server know them too (needed '/' to identify the local path)
app.use('/js',   express.static(__dirname + '\\public\\js'));
app.use('/css',  express.static(__dirname + '\\public\\css'));
app.use('/imgs',  express.static(__dirname + '\\public\\imgs'));

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //permite poder entender datos de formularios html, y extend false porque no permito el envio de ficheros grandes como imagenes solo texto
app.use(express.json( {limit: '1mb'} ));

// connection to database
require('./mongoDB/connect.js');

// importing routes
const indexRoutes = require('./index.js');
// routes
app.use('/', indexRoutes);

// start up
app.listen(app.get('port'), () => {
    console.log(`Server app listening on port ${app.get('port')}!`);
});
