require('dotenv/config');
require('../configs/db.config');

const Movie = require('../models/movie.model')

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjgzMjMzYmI5YWQ0OThiZTZjOTYwNWU4OWU3MjU0YiIsInN1YiI6IjY1ZTc2MTZiMzFkMDliMDE3ZGUzMTFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VqyuyEvW2r3JaqHTZs4ebw0E0fyaV-pZIHegl3zbIXw'
  }
};



let i = 1;
let num = 10000


function fetchPage() {
    if (i <= num) {
        const newUrl = `https://api.themoviedb.org/3/discover/movie?page=${i}&sort_by=popularity.desc`;
       //const newUrl = `https://api.themoviedb.org/3/discover/movie?include_video=false&language=es-ES&page=${i}&sort_by=popularity.desc`;

        fetch(newUrl, options)
            .then(response => response.json())
            .then(json => {
                if (json.results) {
                    return Movie.create(json.results)
                        .then((movies) => {
                            console.log(`${movies.length} movies created`)
                            console.log(`${i}/${num}`)
                        })
                        .catch((error) => console.error('error al crear', error));
                } else {
                    console.log('error');
                }
            })
            .catch(err => console.error('error:' + err))
            .finally(() => {
                i++;
                setTimeout(fetchPage, 450); // Llama a la función nuevamente después de 1 segundo
            });
    } else {
        console.log('all movies created');
    }
}

fetchPage(); // Inicia el proceso



  



