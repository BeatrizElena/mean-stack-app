//  NO LONGER NEEDING THIS FILE BC CONTROLLERS WERE SEPARATED INTO 2 .JS FILES. LEAVING THIS FILE HERE FOR EDUCATIONAL PURPOSES ONLY!!
 
 
 
 // Module Getter Syntax -- angular.module('myApp'); -- gets a module "myApp" to which you can add -- .controller(.'MyController', MyController) -- 
 // where "MyController" will be handled by a function called MyController.
 angular.module('myApp').controller('MainController', MainController).controller('FilmController', FilmController); 
 
 function MainController($http) {
     var vm = this;
    $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=614034599281c3d5060602eb29fb7e0b&language=en-US&page=1').then(function(response) {
        console.log(response.data);
        vm.films = response.data.results; //working as vm.films = response.data.results;
    });
    vm.name = 'Bea';
 }

 function FilmController($http, $routeParams) {
     var vm = this;
     var id = $routeParams.filmid;
     $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=614034599281c3d5060602eb29fb7e0b&language=en-US&page=1' + id).then(function(response) {
        console.log(response.data.results);
        vm.film = response.data.results;
    });
 }