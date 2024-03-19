const fetch = require('node-fetch');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjgzMjMzYmI5YWQ0OThiZTZjOTYwNWU4OWU3MjU0YiIsInN1YiI6IjY1ZTc2MTZiMzFkMDliMDE3ZGUzMTFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VqyuyEvW2r3JaqHTZs4ebw0E0fyaV-pZIHegl3zbIXw'
  }
};

function getCreditsApi(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

    return fetch(url, options)
        .then(res => res.json())
        .catch(error => {
            throw error; 
        });
}

function getImagesApi(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/images`;

    return fetch(url, options)
        .then(res => res.json())
        .catch(error => {
            throw error; 
        });
}

function getRecomApi(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;

    return fetch(url, options)
        .then(res => res.json())
        .catch(error => {
            throw error; 
        });
}


function getReviewApi(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;

    return fetch(url, options)
        .then(res => res.json())
        .catch(error => {
            throw error; 
        });
}


module.exports = {getCreditsApi, getImagesApi, getRecomApi, getReviewApi};