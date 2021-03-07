
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
  if (cities.length > 8) {
    cities.shift()
  }
  // if the form is blank return from the function early
  if (city == '') {
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
      var dataDate = data.dt * 1000;
      var convertDate = new Date(dataDate);
      var humanDateFormat = convertDate.toLocaleString('en-US', { timeZoneName: 'short' })
      var dataIcon = data.weather[0].icon;
      var dataTemp = data.main.temp;
      var dataHum = data.main.humidity;
      var dataWind = data.wind.speed;




      $('#city').text(dataName);
      $('#today-date').text(humanDateFormat)

      $('#today-weather-icon').attr({ "src": "http://openweathermap.org/img/w/" + dataIcon + '.png', 'height': '100px', 'width': '100px' });

      $('#temp').text('Temperature: ' + dataTemp + String.fromCharCode(176) + 'F');
      $('#humidity').text('Humidity: ' + dataHum + String.fromCharCode(37));
      $('#wind-speed').text('Wind Speed: ' + dataWind + ' MPH');

      //second API call for 5 day forecast
      var secondRequestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&units=imperial&appid=' + apiKey;
      return fetch(secondRequestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data)
          var numberOfDays = 0;

          //iterate over the 40 weather data sets = 5 days x 8 hours per day
          for (var i = 0; i < data.list.length; i++) {

            //split function to isolate the time-data
            if (data.list[i].dt_txt.split(' ')[1] == '15:00:00') {
              //When its 3pm update these fields
              var day = data.list[i].dt_txt.split('-')[2].split(' ')[0];
              var month = data.list[i].dt_txt.split('-')[1];
              var year = data.list[i].dt_txt.split('-')[0];
              $('#date').text(month + '/' + day + '/' + year)
              var data5DayTemp = data.list[i].main.temp;
              $('.card-temp').text('Temperature: ' + data5DayTemp + String.fromCharCode(176) + 'F')
              $('.card-hum').text('Humidity: ' + data.list[i].main.humidity + String.fromCharCode(37))
              $('#5-day-weather-icon').attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            }
            numberOfDays++;

          }
        })
    });
}
