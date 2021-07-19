var filter = {
    TITLE: "",
    Language: "",
    'DEVELOPMENT SPACE': "",
    'START DATE': "",
    'END DATE': "",
    PRESENTIAL: "",
    TOPICS: "",
    EVENTS: ""
};  //object that will contain each filter value

//buttons functionalities
const resetButton = document.getElementById('reset');
const filterButton = document.getElementById('filter');

resetButton.addEventListener('click', resetFilter());

filterButton.addEventListener('click', (event) => {
    //gather every filtered element
    let filterTitle = document.getElementById('TITLE');
    let filterLanguage = document.getElementById('Language');
    let filterDevelopment = document.getElementById('DEVELOPMENT SPACE');
    let filterStartDate = document.getElementById('start-date');
    let filterEndDate = document.getElementById('end-date');
    let filterPresential = document.getElementById('PRESENTIAL');
    let filterTopics = document.getElementById('TOPICS');
    let filterEvents = document.getElementById('EVENTS');

    filter.TITLE = filterTitle.value;
    filter.Language = filterLanguage.value;
    filter['DEVELOPMENT SPACE'] = filterDevelopment.value;
    filter['START DATE'] = filterStartDate.value;
    filter['END DATE'] = filterEndDate.value;
    filter.PRESENTIAL = filterPresential.value;
    filter.TOPICS = filterTopics.value;
    filter.EVENTS = filterEvents.checked;

    //empty filter and refresh the map
    resetFilter();
    initMap();
    console.log("Has filtrado por", filter);
});


function resetFilter() {
    document.getElementById('TITLE').value = "";
    document.getElementById('Language').value = "";
    document.getElementById('DEVELOPMENT SPACE').value = "";
    document.getElementById('start-date').value = "";
    document.getElementById('end-date').value = "";
    document.getElementById('PRESENTIAL').value = "";
    document.getElementById('TOPICS').value = "";
    document.getElementById('EVENTS').checked = false;
}