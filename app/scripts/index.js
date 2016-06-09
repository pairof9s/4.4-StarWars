var $ = require('jquery');
var handlebars = require('handlebars');

var githubtoken = require('./githubapikey.js');

if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });
}
console.log(githubtoken);

var baseURL = 'http://swapi.co/api/';
var planetListItemTemplate = $('#planet-list-item-template').html();
var template = handlebars.compile(planetListItemTemplate);

$('.js-planets-button').on('click', function(event){
  event.preventDefault();
  // console.log('clicked');
  fetchPlanets();
});

function fetchPlanets(){
  var planetsURL = baseURL + 'planets/';
  // var returnMeSomeData = $.ajax(planetsURL);
  // console.log(returnMeSomeData);
  $.ajax(planetsURL).done(function(planetList){
    // console.log(data);
    planetList.results.forEach(function(planet){
      displayPlanet(planet);
    });
  });
}

function displayPlanet(planet){
  var html = template(planet);
  $('.js-planet-list').append(html);

  $.ajax(planet.url).done(function(planetDetails){
    $('#' + planetDetails.name).append('<span>::' + planetDetails.climate + '<span>');
    console.log(planetDetails);
  });
}
