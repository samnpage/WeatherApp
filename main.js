// URL and API Key
const baseURL = 'http://api.weatherapi.com/v1/current.json';
const key = 'f9a4eee1a79746d8a39194142231908';
let url;

// Search Form
const searchTerm = document.querySelector('.search');
const submitBtn = document.querySelector('.submit');
const searchForm = document.querySelector('form');

// RESULTS SECTION
const section = document.querySelector('section');

// Event Listeners
searchForm.addEventListener('submit', fetchResults);
searchTerm.addEventListener('click', function() {
    searchTerm.placeholder = 'City, State';
});

searchTerm.addEventListener('blur', function() {
    searchTerm.placeholder = 'Enter in location';
});

// Results Function
function fetchResults(e) {
    
    e.preventDefault();

    url = baseURL + '?key=' + key + '&q=' + searchTerm.value;
    console.log(url);

    fetch(url)
        .then(function(result) {
        console.log(result)
        return result.json();
    }) .then(function(json) {
        displayResults(json);
    })
};

// Display Results Function
function displayResults(json) {

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    };


    let currentTemp = json.current.temp_f;
    let locationName = json.location.name;
    let locationRegion = json.location.region;
    let currentCondition = json.current.condition.text;

    let heading = document.createElement('h2');
    let article = document.createElement('article');
    let temp = document.createElement('p');
    temp.classList.add("temp-display");
    let condition = document.createElement('span');

    temp.textContent = Math.round(currentTemp) + "°";

    heading.textContent = locationName + ", " + locationRegion;
    condition.textContent = currentCondition;

    function changeFontColor() {
        if (currentTemp >= 90) {
            temp.style.color = '#DC143C';
        } else if (currentTemp <= 32) {
            temp.style.color = '#87CEEB';
        } else {  
        };
    }
    console.log(json)
    changeFontColor()
    
    article.appendChild(heading);
    article.appendChild(temp);
    article.appendChild(condition);
    section.appendChild(article);      
};