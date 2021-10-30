# Geolocalizador de Ciencia Ciudadana
#### Proyecto desarrollado por **Alex Acosta Garcia**
Code is commented mostly in english but part of the elements are spelled in spanish due to my work for the TFG.
The complete TFG with further information can be accessed through the url http://hdl.handle.net/10230/48537.

## Descripción
Este proyecto, realizado como trabajo de final de grado, tiene el objetivo de acercar de manera accesible los proyectos de ciencia ciudadana. Para llevarlo a cabo creamos un aplicativo que dispone de herramientas para localiza proyectos en un mapa, en el que podemos filtrar los proyectos mostrados, y otra para añadir nuevos. Además, los proyectos disponen del añadido de eventos aparte de su información general.

## Description
This project, carried out as a final degree project, has the objective of approaching citizen science projects. To carry it out we created an application that has tools to locate projects on a map, in which we can filter between the projects shown, and to add new projects to the map. Furthermore, the projects have the inclusion of Events in addition to their general information.

## Requerimientos
Para poder utilizar la aplicación y hacerla funcionar con todas las funcionalidades necesitarás instalar en primer lugar el entorno node.js y sus módulos. Luego, para poder utilizar la misma base de datos, debes recrear el entorno MongoDB donde se guardarán los proyectos y sustituir el URI por tu propio acceso a la base de datos en el archivo ***src/mongoDB/connect.js*** connect function. Esto puede hacerse localmente instalando MongoDB Compass o en línea mediante MongoDB Atlas. Por último, es necesario crear una cuenta de Google Cloud Platform y definir tus propias credenciales de proyecto en el archivo ***src/public/views/projectsMap.ejs*** en lugar de "YOUR_API_KEY", de modo que puedas obtener las credenciales para hacer funcionar el mapa y sus funcionalidades.

## Requirements
In order use the application and make it work with all the functionallities you wold need to install first of all the environment node.js and its modules. Then, in order to use the same database, you must recreate the MongoDB environment where the projects will be saved and replace the URI  by your own database access in the file ***src/mongoDB/connect.js*** connect function. This can be done locally installing MongoDB Compass or online with MongoDB Atlas. Finally, you need to create a Google Cloud Platform account and define your own project credentials in the file ***src/public/views/projectsMap.ejs*** in place of "YOUR_API_KEY", so you can get the credentials to make the map and its functionalities work.
