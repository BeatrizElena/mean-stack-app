angular.module('myApp').controller('MainController', MainController);

function MainController(FilmFactory) {
    var vm = this;
   
    FilmFactory.getAllFilms().then(function(response) {
        vm.films = response;
    });

   vm.name = 'Bea';
}


// function MainController($http) {
//     var vm = this;
//    $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=614034599281c3d5060602eb29fb7e0b&language=en-US&page=1/film').then(function(response) {
//        console.log(response.data);
//        vm.films = response.data.results; //working as vm.films = response.data.results;
//    });
//    vm.name = 'Bea';
// }