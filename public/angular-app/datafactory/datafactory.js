angular.module('myApp').factory('FilmFactory', FilmFactory);

function FilmFactory($http) {
    return {
        getAllFilms: getAllFilms,
        getOneFilm: getOneFilm
};

function getAllFilms() {
    return $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=614034599281c3d5060602eb29fb7e0b&language=en-US&page=1/films').then(complete).catch(failed);
}

function getOneFilm(id) {
    return $http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=614034599281c3d5060602eb29fb7e0b&language=en-US&page=1/films/' + id).then(complete).catch(failed);
}

function complete(response) {
    return response.data.results;
}

function failed(error) {
    return error.statusText;
}
}