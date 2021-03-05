
var mainCardEl = document.getElementById('main-card-body')
var searchButton = document.getElementById('search-button')
var weatherData;
var cityName = document.getElementById('form-control')
var city = '';
var cities = []
var cityHistoryBox = document.getElementById('search-history-box')
apiKey ='';
init()
historyClicked()


// Get local storage of user inputs of cities and fill array
function init() {
  var savedCities = JSON.parse(localStorage.getItem('cities'));

  if (savedCities !== null) {
    cities = savedCities
  }
  displayCityHistory();
}



// Save to local storage the user input of array of strings as a JSON stringify
function cityStorage() {
  localStorage.setItem('cities', JSON.stringify(cities));

}


//Show buttons of each element in the cities array as a search history on left side of page
function displayCityHistory() {
  cityHistoryBox.innerHTML = '';

  if (cities == null) {
    return;
  }
  //using `set` of unique strings in order it was entered to turn into an array and loop over
  var userInputCity = [...new Set(cities)];
  for (var i = 0; i < userInputCity.length; i++) {
    var cityNamesHistory = userInputCity[i];

    var cityHistoryButtonEl = document.createElement('button');
    cityHistoryButtonEl.textContent = cityNamesHistory;
    cityNamesHistory.setAttribute('class', 'history-list-buttons');

    cityHistoryBox.appendChild(cityHistoryButtonEl);

    historyClicked()
  }
}

//The on click function for the city search history using jquery
function historyClicked() {
  $('.history-list-buttons').on('click', function (event) {
    event.preventDefault();
    city = $(this).text().trim();
    // console.log('maybe this works now')
    weatherApiCalls();
  });
}

//The on click for the primary search bar using jquery here as well 
function searchButtonClicked(){
$('#searchbtn').on('click', function (event){
  event.preventDefault();
  city =$(this)
})
}

// function calling api twice with fetch on for current weather and one for 5 day forecast
// function weatherApicalls() {
//   // console.log('testing', weather);
//   var cityInput = cityName.value()
//   var apiKey = '{2a5a9e3f8873ca8b4f13d2b884564b89}';
//   var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + { cityInput } + '&appid=' + apiKey;


//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // console.log(data)--may need for loop here
//       for (var i = 0; i < data.length; i++) {
//         weatherData = data[i].html_url

//         var mainCardWeather = document.createElement('div')
//         mainCardWeather.textContent = data[i].html_url;         // mainCardEl.appendChild(mainCardWeather)
//       }
//     });
// }
// weather('Las Vegas')

// searchButton.addEventListener('click', weather)
