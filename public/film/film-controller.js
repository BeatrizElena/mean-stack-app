angular.module('myApp').controller('FilmController', FilmController);

function FilmController($routeParams, FilmFactory) {
    var vm = this;
    var id = $routeParams.id;
    FilmFactory.getOneFilm(id).then(function(response) {
        vm.film = response;
    });
}







// function FilmController($http, $routeParams) {
//     var vm = this;
//     var id = $routeParams.id;
//     $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=614034599281c3d5060602eb29fb7e0b&language=en-US&page=1/film' + id).then(function(response) {
//        console.log(response.data.results);
//        vm.film = response.data.results;
//    });