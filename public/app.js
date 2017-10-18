 // Module Setter Syntax: array is for dependencies but even w/out dependencies an empty array is needed
// controllers are in separate file: controllers.js which we'll link to in the html file.
// API Key: 614034599281c3d5060602eb29fb7e0b
// Sample request: https://api.themoviedb.org/3/movie/550?api_key=614034599281c3d5060602eb29fb7e0b 
// https://api.themoviedb.org/3/movie/top_rated?api_key=614034599281c3d5060602eb29fb7e0b&language=en-US&page=1
angular.module('myApp', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
    }).when('/film/:filmid', {
        templateUrl: 'film/film.html',
        // templateUrl: function(params){ return '/templates/film.html' + params.id;},
        controller: 'FilmController',
        controllerAs: 'vm'
    }).otherwise({
        redirectTo: '/'
    });
}