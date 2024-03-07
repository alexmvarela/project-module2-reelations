const Movie = require('../models/movie.model')

module.exports.home = (req, res, next) => {
                
    Movie.find()
        .then((movies) => {
            const firstMovies = movies.slice(0, 15)
            res.render('home', {movies: firstMovies})
        })
        .catch(next)
};





//trending