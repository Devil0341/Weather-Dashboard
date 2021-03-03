//search button
var searchButtonEl= $('.btn')
var searchInputEl = $('#city-list')

searchButtonEl.on('click', function(event){
  event.preventDefault()
  // grabbing the city
  var inputCity = $('#form1').val();


  //if nothing entered and button is clicked
if (!inputCity){
  console.log('No City filled out');
  return;
}

 var cityHistoryEl = $('<li class="list-group-item list-group-item-dark col-12 m-1">')


// $('<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">');

cityHistoryEl.text(inputCity);

//Print to page lecture 5-6
searchInputEl.append(cityHistoryEl)


})



// api from weather website
// api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={API key}

// //fetch data 
// // Replace ./data.json with your JSON feed
// fetch('./data.json')
//   .then((response) => {
//     return response.json()
//   })
//   .then((data) => {
//     // Work with JSON data here
//     console.log(data)
//   })
//   .catch((err) => {
//     // Do something for an error here
//   })