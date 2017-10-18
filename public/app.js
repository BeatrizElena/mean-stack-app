 // Module Setter Syntax: array is for dependencies but even w/out dependencies an empty array is needed
// controllers are in separate file: controllers.js which we'll link to in the html file. 
angular.module('myApp', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/main.html',
        controller: 'MyController',
        controllerAs: 'vm'
    }).when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
    }).otherwise({
        redirectTo: '/'
    });
}