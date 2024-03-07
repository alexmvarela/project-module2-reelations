const Movie = require('../models/movie.model')
const Genre = require('../models/genre.model.js')

module.exports.home = (req, res, next) => {
                
    Movie.find({lang: res.locals.lang}).limit(35)
        .then((movies) => {
            
            return Genre.find()
                .then((genres) => {
                    
                    res.render('home', {movies, genres})
                })
        })
        .catch(next)
};


module.exports.filter = (req, res, next) => {

    const rate = req.body.vote_average

    if(req.body.action === 'random') {
        Movie.find({lang: res.locals.lang}).limit(15)
        .then((movies) => {
            const firstMovies = movies.slice(0, 15)
            
            return Genre.find()
                .then((genres) => {
                    return Movie.find({ vote_average: { $gte: rate }, genre_ids: { $in: [req.body.genre] }, lang: res.locals.lang })
                    .then((result) => {
                        return  Genre.findOne( {id: req.body.genre})
                            .then((actualGen) => {
                                genres.forEach(g => {
                                    if (g.id.toString() === actualGen.id.toString()) {
                                        g.selected = true
                                    }
                                 })       
                                const getRandom = result[Math.floor(Math.random() * result.length) + 1]
                                res.render('home', {getRandom, genres, movies: firstMovies, actualGen})
                                console.log(req.body)
                            })
                        
                    })
                    .catch(next)
                })
        })
        .catch(next)
    } else if (req.body.action === 'viewAll') {

        const rate = req.body.vote_average
        Movie.find({ vote_average: { $gte: rate }, genre_ids: { $in: [req.body.genre] } })
                    .then((result) => {
            
                        const firstResults = result.slice(0, 5)
                        res.render('results', {firstResults})

                    })
                    .catch(next)
    }

    
}