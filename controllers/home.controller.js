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

    const filterDate = {};
    const decade = req.body.release_date

    if (req.body.release_date !== '2030') {
        filterDate.release_date = { $gte: req.body.release_date, $lt: (+req.body.release_date + 9).toString() };
    } else {
        filterDate.release_date = { $gte: '1900'}
    }

    // DECIRLE QUE SI NO HA RECIBIDO NINGUN INPUT DE ORDEN, ORDENE POR POPULARIDAD

    let rate = req.body.vote_average || "0"
    
    if(req.body.action === 'random') {
        Movie.find({lang: res.locals.lang}).limit(15)
        .then((movies) => {
            const firstMovies = movies.slice(0, 15)
            return Genre.find()
                .then((genres) => {


                    // DENTRO DEL FIND INCLUIR EL SORT SEGUN LA SINTAXIS DE MONGO

                    return Movie.find({ vote_average: { $gte: rate }, genre_ids: { $in: [req.body.genre] }, lang: res.locals.lang, release_date: filterDate.release_date})
                    .then((result) => {
                        return  Genre.findOne( {id: req.body.genre})
                            .then((actualGen) => {
                                genres.forEach(g => {
                                    if (g.id.toString() === actualGen.id.toString()) {
                                        g.selected = true
                                    }
                                 })       
                                const getRandom = result[Math.floor(Math.random() * result.length) + 1]
                                res.render('home', {getRandom, genres, movies: firstMovies, actualGen, rate, decade})
                            
                                
                            })
                            
                        
                    })
                    .catch((error) => {
                        res.status(400).render('home', { genres, movies: firstMovies, rate,  error})
                    })
                })
        })
        .catch(next)
    } else if (req.body.action === 'viewAll') {

        Movie.find({lang: res.locals.lang}).limit(15)
        .then((movies) => {
            const firstMovies = movies.slice(0, 15)
            
            return Genre.find()
                .then((genres) => {
                    return Movie.find({ vote_average: { $gte: rate }, genre_ids: { $in: [req.body.genre] }, lang: res.locals.lang, release_date: filterDate.release_date})
                    .then((result) => {
                        return  Genre.findOne( {id: req.body.genre})
                            .then((actualGen) => {
                                genres.forEach(g => {
                                    if (g.id.toString() === actualGen.id.toString()) {
                                        g.selected = true
                                    }
                                 })       
                                const firstResults = result
                                res.render('movies/movies', {firstResults, genres, movies: firstMovies, actualGen, rate, decade})
                            })
                    })
                    .catch((error) => {
                        res.status(400).render('home', { genres, movies: firstMovies, rate,  error})
                    })
                })
        })
        .catch(next)
    }

    
}