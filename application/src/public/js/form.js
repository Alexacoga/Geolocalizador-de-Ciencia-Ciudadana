
var date = new Date().toJSON().split('T'); //split the date into date format and time
document.getElementById('start-date').min = date[0]; //fix today date to the minimun value

const startDateSelector = document.getElementById('start-date');
const endDateSelector = document.getElementById('end-date');
startDateSelector.addEventListener('change', (event) => {   //The end date minimum will be the start date
    document.getElementById('end-date').min = startDateSelector.value;
});
endDateSelector.addEventListener('change', (event) => {   //The start date maximum will be the end date
    document.getElementById('start-date').max = endDateSelector.value;
});


const events = document.getElementById('EVENTS');
const addEventsButton = document.getElementById('addEvents');
addEventsButton.addEventListener('click', (event) => {
    let inputTableRow = document.createElement('tr');
    inputTableRow.id = "input-event";
    //set the structure to the attribute (inputs with a table form)
    inputTableRow.innerHTML = `<td><input type="text" name="event-name"></td> 
    <td><input type="text" name="event-description" id="event-description"></td> <td><input type="text" name="event-material" id="event-material"></td> 
    <td><input name="event-start-date" type="datetime-local" class="table-date-input"></td> 
    <td><input name="event-end-date" type="datetime-local" class="table-date-input"></td>
    
    <td><select name="event-class" id="event-class"><option></option><option>Seleccionar políticas de investigación</option><option>Desarrollo de investigación</option>
    <option>Recolección de datos</option><option>Preparación y procesado de datos</option>
    <option>Recuperación de información científica</option><option>Desarrollo experimental</option><option>Manejo de los conocimientos</option>
    <option>Análisis y resolución de problemas</option><option>Revisión y evaluación</option>
    <option>Investigación de actuación</option><option>Participación en desarrollo técnico</option>
    <option>Otras actividades</option><option>Proporción de recursos</option></select></td>
    
    <td><select name="event-presentiality"><option></option><option>Presencial</option><option>A distancia</option><option>Mixto</option></select></td>
    <td><input type="text" name="event-duration" placeholder="larga/tiempo"></td>`;
    events.appendChild(inputTableRow);
});

//selected by name to generalise between all the same input for dates restrictions