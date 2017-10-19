angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    var vm = this;
    vm.title = 'MEAN Hotel App';
    hotelDataFactory.hotelList().then(function(response) {
        // console.log(response); // we get all properties of the object
        vm.hotels = response.data; //we get just the data property of the object
    });
}