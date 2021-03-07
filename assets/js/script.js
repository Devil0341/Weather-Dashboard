
var weatherData;
var cityName = document.getElementById('form-control')
var city = '';
var cities = []
var cityHistoryBox = document.getElementById('search-history-box')
var apiKey = '';
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
    cityHistoryButtonEl.setAttribute('class', 'history-list-buttons');

    cityHistoryBox.appendChild(cityHistoryButtonEl);

    historyClicked();
  }
}

//The on click function for the city search history using jquery
function historyClicked() {
  $('.history-list-buttons').on('click', function (event) {
    event.preventDefault();
    city = $(this).text().trim();
    // console.log('maybe this works now')
    weatherApiCalls(city);
  });
}

//The on click for the primary search bar using jquery here as well 
$('#search-button').on('click', function (event) {
  event.preventDefault();

  city = $(this).prev().val().trim()

  //Push the city the user entered into search bar into the cities array
  cities.push(city);

  //make sure cities array.length is never more than 8
  if ( cities.length > 8){
    cities.shift()
  }
  // if the form is blank return from the function early
  if (city == ''){
    return;
  }

  weatherApiCalls(city);
  displayCityHistory();
  cityStorage();
 
});



// function calling api twice with fetch on for current weather and one for 5 day forecast use jquery to display 
function weatherApiCalls(cityInput) {
  // console.log('testing', weather);
  // var cityInput = cityName.value()
   apiKey = '2a5a9e3f8873ca8b4f13d2b884564b89';
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=' + apiKey;


  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      
      var dataName = data.name;
      var dataDate= data.dt*1000;
      var convertDate = new Date(dataDate);
      var humanDateFormat = convertDate.toLocaleString('en-US',{timeZoneName:'short'})
      var dataIcon = data.weather[0].icon;
      var dataTemp = data.main.temp;
      var dataHum = data.main.humidity;
      var dataWind = data.wind.speed;
      
      
      
      
      $('#city').text(dataName);
      $('#today-date').text(humanDateFormat)
      
      $('#today-weather-icon').attr({"src": "http://openweathermap.org/img/w/" + dataIcon + '.png', 'height':'100px','width':'100px'});
  
      $('#temp').text('Temperature: ' + dataTemp + String.fromCharCode(176) + 'F');
      $('#humidity').text('Humidity: ' + dataHum + String.fromCharCode(37));
      $('#wind-speed').text('Wind Speed: ' + dataWind +' MPH');
   
   
    });
}
