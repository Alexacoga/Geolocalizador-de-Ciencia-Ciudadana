
//extract the variable from the span element
var allProjects = JSON.parse(document.querySelector("#projects").innerText );
var filteredProjects = []; //save the filtered ones (no need to update page, has allProjects saved)
if (allProjects.length) { //try if the variable has any projects
    console.log("Proyectos extrapolados de la database: ", allProjects); //to see that we can see all the projects
} else {
    console.warn("No se han recibido proyectos a mostrar."); //warn extraction from the database problem 
}

//get the date-time
const now_date = new Date().toJSON().split('T');


function initMap(){
    //GEOCODING defined inside since needs the google component obtained by key
    const geocoder = new google.maps.Geocoder();  //variable to obtain LatLng from address
    
    let geolocation = { lat: 41.4042081 ,lng: 2.1913638 };   //geolocation coordinates set as center of the map, default at UPF
    //try to get the user approximate position coordinates
    if (navigator.geolocation) { //if navigator permits to get geolocation
        navigator.geolocation.getCurrentPosition(
            function(userPosition){
                geolocation = new google.maps.LatLng(userPosition.coords.latitude, userPosition.coords.longitude); //same as doing it manually
            }
        );
        
    } else { alert("No se ha podido obtener tu ubicación, se usará otra por default."); } //message if not possible
    

    //Instance the map
    var map = new google.maps.Map(document.getElementById('map'),{ //define the map options
        mapId: '6bf2edb6b3ee0526',//define the map style, created custom
        center: geolocation,
        zoom: 12
        //mapTypeId
    });

    //array of example markers 
    var markers = [];
    var zIndex = 0; //index for the markers order
    //Locate the user if allows location
    if (navigator.geolocation)
        markers.push({coord: geolocation, name: 'Estas aquí!',  content: `<center><h3>TU UBICACIÓN</h3></center>`,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#20b2aa',
            strokeColor: '#1d9993',
            fillOpacity: 1,
            strokeWeight: 2,
            scale: 8,
        } }); //custom icon for the user location

    if (allProjects) {
        fillMarkers(markers);
    }
    
    var delay = 100;
    var markerIndex = -1;
    addMarkers(); //timeout to avoid the problem of OVER_QUERY_LIMIT


    // Functions that need google components*
    function addMarkers(){ //function to add markers to the map
        markerIndex++; //done here before, in order to not avoid to do it before callback
        if(markerIndex < markers.length) { //while remain markers to add USE VAR MARKERS
            let props = markers[markerIndex];
            if (typeof props.coord === "string" ) //case of coordinates (location) is defined as an adress
                setTimeout( getCoordinates(props, addMarkers) , delay); //timeout of 100ms to avoid error OVER_QUERY_LIMIT on Geocoding;          
            else {
                setFeatures(props);
                addMarkers();
            }
        } else {
            let totalProjects = document.createElement('h2');   //add dynamically an HTML element
            totalProjects.id = "info-title";
            totalProjects.innerHTML =`RECUENTO TOTAL DE PROYECTOS: ${navigator.geolocation ? (markers.length - 1) : markers.length}.`; //-1 in case it added the user location
            let mainContainer = document.getElementById('main-container'); //here we add the total count
            if(mainContainer.lastElementChild.id == "info-title") mainContainer.removeChild(mainContainer.lastElementChild);; //in case we used filter and it already has the count, remove old one
            mainContainer.appendChild(totalProjects);
        }
    }

    
    function getCoordinates(props, callback) {    //function to get the coordinates from an address, the inside create the marker
        //cant return since is asyncronous, only on callback to return lat-lng correctly

        if (typeof props.coord === "string" ) { //in case the coordinates are defined as an address
            geocoder.geocode( {address: props.coord}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    let coordinates = results[0].geometry.location;
                    //add a random number for the markers that are located in the same spot
                    var lat = coordinates.lat() + Math.random()/100;
                    var lng = coordinates.lng() + Math.random()/100;
                    //console.log("Adress '"+ props.coord +"' to coordinates: ", {lat, lng} ); //*Debug to see the coordinates
                    props.coord = {lat, lng}; //update the location with thecoordinates
                    setFeatures(props);
                } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    markerIndex--;
                    delay++;
                } else {
                    console.warn("Marker geocoding with address '" + props.coord + "' was not successfully geocoded for the following reason: " + status);
                }
                callback();
            });
        }
        
    }


    function setFeatures(props) { //set marker features
        var marker = new google.maps.Marker({
            map: map,
            position: props.coord,
            title: props.name,
        });

        //set every possible but not necessary initialization
        if(props.icon) {    //check for an icon
            marker.setIcon(props.icon);
        }

        if(props.content != null) { //actually it must haveone
            var infoWindow = new google.maps.InfoWindow({
                title: props.name,
                content: props.content,
                minWidth: 150,
                minHeight: 200,
                maxWidth: 675,
                maxHeight: 500,
                zIndex: zIndex,
            });
            marker.addListener("click", function(){ //show when marker is clicked
                infoWindow.setZIndex(zIndex++);
                infoWindow.open(map, marker);
            }); //**añadir animación al clicar dentro tmb luego
            //infoWindow no tiene eventos propios de detección
        }
    }

} //End initMap


// FUNCTIONS (do not need any "google" component)*
function fillMarkers(markers) {

    //apply the filter on markers
    filteredProjects = allProjects;
    if (filter.TITLE) {
        filteredProjects = filteredProjects.filter( filteredProjects => 
            filteredProjects.TITLE.indexOf(filter.TITLE) != -1
        ); //set to uppercase to avoid confusions
    }
    if (filter.TOPICS) {
        filteredProjects = filteredProjects.filter( filteredProjects => 
            filteredProjects.TOPICS.indexOf(filter.TOPICS) != -1
        ); //set to uppercase to avoid confusions
    }
    if (filter.Language) {
        filteredProjects = filteredProjects.filter(function(filteredProjects) {
            if (filter.Language.toUpperCase() == "CASTELLANO") {
                return filteredProjects.Language.toUpperCase().indexOf(filter.Language.toUpperCase()) != -1
                || filteredProjects.Language.toUpperCase().indexOf("SPANISH") != -1; //case in english for proportioned projects
            } else {
                return filteredProjects.Language.toUpperCase().includes(filter.Language.toUpperCase());
            }
        });
    }
    if (filter['DEVELOPMENT SPACE']) {
        filteredProjects = filteredProjects.filter(filteredProjects => filteredProjects['DEVELOPMENT SPACE'] == filter['DEVELOPMENT SPACE']);
    }
    if (filter.PRESENTIAL) {
        filteredProjects = filteredProjects.filter(filteredProjects => filteredProjects.PRESENTIAL == filter.PRESENTIAL);
    }
    if (filter['START DATE']) {
        filteredProjects = filteredProjects.filter(filteredProjects => filteredProjects['START DATE'] >= filter['START DATE']);
    }
    if (filter['END DATE']) {
        filteredProjects = filteredProjects.filter(filteredProjects => filteredProjects['END DATE'] <= filter['END DATE']);
    }
    if (filter.EVENTS) { //case check for events, only the ones that have are selected
        filteredProjects = filteredProjects.filter(filteredProjects => filteredProjects.EVENTS);
    }
    //the ones that do not have the filtered atribute are not used
    console.log("FilteredProjects", filteredProjects);

    filteredProjects.forEach(project => { //ya que son diferentes los atributos podemos hacer un || para los de ESP, CAT o Introducidos
        let name = project.TITLE;

        let description = "";   //Description
        project.DESCRIPTION.forEach(line => {
            description += line + '<p></p>';   
        });

        let objectives = "";   //Description
        if (project.OBJECTIVES) {
            objectives = `<b style="margin-bottom:5px">Objetivos:</b><p>`;
            project.OBJECTIVES.forEach(line => {
                objectives += line + '<p></p>';   
            });
            objectives += "</p>";
        }
        
        let tasks = "";
        if (project.TASKS) {
            tasks = `<b style="margin-bottom:5px">Tareas a realizar:</b><p>`;
            project.TASKS.forEach(line => {
                tasks += line + '</p><p>';   
            });
            tasks += "</p>";
        }

        let tools = "";
        if (project.TOOLS) {
            tools = `<b style="margin-bottom:5px">Herramientas:</b><p>`
            + project.TOOLS + "</p>";
        } else tools = `<b style="margin-bottom:5px">Herramientas sin definir.</b>`;

        let entity = "";
        if (project['MAIN PROGRAM OR PERSON IN CHARGE']) {
            entity = `<p><b>Entidad:</b> ${project['MAIN PROGRAM OR PERSON IN CHARGE']}`;
        }

        let dev_lvl = "";
        if (project['DEVELOPMENT SPACE']) {
            dev_lvl = `<b style="margin-left: 30px;">Desarrollo a nivel ${project['DEVELOPMENT SPACE']}</b></p>`
        } else dev_lvl = " </p>"

        let members = "";
        if (project['NUMBER OF MEMBERS']) {
            members = `<p><b>Número de participantes:</b> ${project['NUMBER OF MEMBERS']}</p>`
        }

        let lang = project.Language;
        if (lang != "") {
            lang = `<b>Idioma/s:</b> ${lang}`;
        }

        let url; //corresponds to the project extraction platform or the project web

        if(project['Url platform'])
        if (typeof project['Url platform']  === 'array') {  //case extracted from various webs, is array
            url = "<b>Webs de extracción:</b> ";
            project['Url platform'].forEach(link => {
                url += `<a href=${link}>${link}</a>`;
            });
        } else {
            url = project['Url platform'];
            url = `<b>Web de extracción:</b> <a href=${url}>${url}</a>`;
        }
        if(project['Project web']) {
            url = project['Project web'];
            url = `<b>Web del proyecto:</b> <a href=${url}>${url}</a>`;
        }

        let topics = "";
        if(project.TOPICS) {
            project.TOPICS.forEach(topic => {
                if(topic) topics = topics + " " + topic + ",";   
            });
        }
        if (topics != "") {
            topics = `<b>Tema/s:</b> ${topics}`;
        }

        let presencial = "";    //type of presentiality
        if (project.PRESENTIAL) {
            presencial = `<b style="margin-left: 55px;"> Presencialidad: </b> ` + project.PRESENTIAL;
        }

        let location = "";
        if (project.LOCATION) {
            location = `<b>Dirección:</b> ${project.LOCATION}`;            
        }

        let webs = "";  //Webs from the project or related
        if (project.WEB[0]) { //if has any web
            webs = "<p><b>Webs relacionadas:</b><br>";
            project.WEB.forEach(link => {
                link = linkFormat(link);
                webs = webs + `<a href= ${link}>${link}</a><br>`
            });
            webs = webs + "</p>";
        }

        let startDate = project['Insert date'] || project['START DATE'];
        let endDate = project['END DATE'];
        
        let date = "";
        let status = "";
        if (startDate) {
            if (!date)  date = date + "<p>"; //if has nothing before opens the paragraph
            date = date + " <b>Fecha inicio:</b> " + startDate;
        }
        if (endDate) {
            if (!date)  date = date + "<p>";
            date = date + ` <b style="margin-left: 30px;">Fecha término:</b> ` + endDate;

            //define the project status
            status = '<p style = "position: absolute; top: 10px; right: 20px; font-weight:bold;';
            status +=  now_date[0] > endDate ? 'color: red;">Finalizado<p>' : 'color: green;">En curso<p>';
        }
        if (date)   date = date + "</p>";

        let events = "";
        if (project.EVENTS) {
            events = `<h3 style="margin-left: 10px; margin-bottom:10px"><b>EVENTOS:</b></h3> <table id="EVENTS"> 
            <tr> <th>Nombre</th> <th>Descripción</th> 
            <th>Materiales</th> <th>Inicio</th> <th>Fin</th>
            <th>Clase</th> <th>Presencialidad</th> 
            <th>Duración</th> <th>Estado</th> </tr> `;
            if (typeof project.EVENTS.name === 'string') { //meaning it only has 1 row defined
                let startDate = project.EVENTS.startDate.split('T');
                let endDate = project.EVENTS.endDate.split('T');
                //get the status by comparing the end and actual date
                let act_status = now_date[0] > endDate[0] ? `<td style="color: red; font-weight:bold;">Finalizado<td>` : `<td style="color: green; font-weight:bold;">En curso<td>`;
                //***no compara bien las horas... || now_date[0] == endDate[0] && now_date[1] > endDate[1]+":00.000Z"

                events += `<tr> <td>${project.EVENTS.name}</td> <td>${project.EVENTS.description}</td> 
                <td>${project.EVENTS.material || "Sin definir"}</td> <td>${startDate[0] + ", " + startDate[1]}</td> 
                <td>${endDate[0] + ", " + endDate[1]}</td> <td>${project.EVENTS.class}</td> <td>${project.EVENTS.presentiality}</td>
                <td>${project.EVENTS.duration || "Sin definir"}</td> ${act_status} </tr>`;
            } else {
                for (let index = 0; index < project.EVENTS.name.length; index++) { //add each event row or ∅
                    //separate dates and time
                    let startDate = project.EVENTS.startDate[index].split('T');
                    let endDate = project.EVENTS.endDate[index].split('T');
                    //get the status by comparing the end and actual date
                    let act_status = now_date[0] > endDate[0] ? `<td style="color: red; font-weight:bold;">Finalizado<td>` : `<td style="color: green; font-weight:bold;">En curso<td>`;

                    events += `<tr> <td>${project.EVENTS.name[index]}</td> <td>${project.EVENTS.description[index]}</td> 
                    <td>${project.EVENTS.material[index] || "Sin definir"}</td> <td>${startDate[0] + ", " + startDate[1]}</td> 
                    <td>${endDate[0] + ", " + endDate[1]}</td> <td>${project.EVENTS.class[index]}</td> <td>${project.EVENTS.presentiality[index]}</td>
                    <td>${project.EVENTS.duration[index] || "Sin definir"}</td> ${act_status} </tr>`;
                }
            }
            
            events += "</table>"; //close the events table
        }

        markers.push( {coord:  project.LOCATION ? project.LOCATION : project['GEOGRAPHICAL LOCATION'] ? project['GEOGRAPHICAL LOCATION'][0] : project.WEB[0], name: name, //podemos usar web si es de la polación ej barcelona.cat ~localizas sino url?
            content: `<h2 style="margin-bottom:10px">${name}</h2>
            <b style="margin-bottom:5px">Descripción:</b>
            <p>${description}</p>
            ${objectives}
            ${tasks}
            ${tools}
            ${entity}${dev_lvl}
            <p>${lang}</p>
            <p>${topics}</p>
            <p>${location} ${presencial}</p>
            ${members}
            ${date}
            <p>${url}</p>
            ${webs}
            ${status}
            <br>${events}`
        } );
    });
}

function linkFormat(link) { //quito el direccionamiento, estetico
    link = link.replace('https://', '');
    link = link.replace('http://', '');
    return link;
}