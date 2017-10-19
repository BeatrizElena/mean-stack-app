angular.module('myApp').controller('MainController', MainController);

function MainController(FilmFactory) {
    var vm = this;
   
    FilmFactory.getAllFilms().then(function(response) {
        vm.films = response;
    });

   vm.name = 'Bea';


vm.date1 = '12 February 2016';
vm.date2 = '11 March 2016';
vm.date3 = '03 January 2015';
vm.date4 = '25 April 2014';
}



// function MainController($http) {
//     var vm = this;
//    $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=614034599281c3d5060602eb29fb7e0b&language=en-US&page=1/film').then(function(response) {
//        console.log(response.data);
//        vm.films = response.data.results; //working as vm.films = response.data.results;
//    });
//    vm.name = 'Bea';
// }