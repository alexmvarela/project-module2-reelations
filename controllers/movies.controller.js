const Genre = require('../models/genre.model')
const Movie = require('../models/movie.model')
const User = require('../models/user.model')
const mongoose = require('mongoose')

module.exports.list = (req, res, next) => {

    // if (Object.keys(req.query).length === 0) {

    // }

    const genreQuery = Genre.find();
    const animationQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [16] }}).limit(35)
    const actionQuery =  Movie.find({lang: res.locals.lang, genre_ids: { $in: [28] }}).limit(35)
    const comedyQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [35] }}).limit(35)
    const thrillerQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [53] }}).limit(35)
    const horrorQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [27] }}).limit(35)
    const dramaQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [18] }}).limit(35)
    const documentalQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [99] }}).limit(35)
    
    Promise.all([genreQuery, animationQuery, actionQuery, comedyQuery, thrillerQuery, horrorQuery, dramaQuery, documentalQuery])
        .then(([genres, animationResult, actionResult, comedyResult, thrillerResult, horrorResult, dramaResult, documentalResult]) => {
                            
                res.render('movies/movies', {animationResult, genres, actionResult, comedyResult, thrillerResult, horrorResult, dramaResult, documentalResult})
        })
        .catch(next)
}

module.exports.filter = (req, res, next) => {

    let rate = req.body.vote_average || "0"

    Genre.find()
        .then((genres) => {
            const body = req.body;
            const filterDate = {};

            if (req.body.release_date !== '2030') {
                filterDate.release_date = { $gte: req.body.release_date, $lt: (+req.body.release_date + 9).toString() };
            } else {
                filterDate.release_date = { $gte: '1900'}
            }

            if (!body.vote_average) {
                body.vote_average = 0
            }

            const chosenGenre = genres.filter((genre) => genre.id === parseInt(body.genre, 10));    

            
            
            const actualPage = req.query.page ? parseInt(req.query.page, 10) : 1;
            const moviesPerPage = 35;
            
            
            const order = !req.body.order ? -1 : parseInt(req.body.order, 10);
            const sortby = {};
            if (req.body.sortby) 
                sortby[req.body.sortby] = order;

            if(body.genre && chosenGenre) {
                const chosenGenreItem = chosenGenre[0].name
                genres.forEach(g => {
                    if (g.name == chosenGenreItem) {
                        g.selected = true
                    }
                 }) 

                return Movie.find({genre_ids: {$in: [body.genre]},
                    vote_average: { $gte: body.vote_average },
                    lang: res.locals.lang,
                    release_date: filterDate.release_date
                 })
                .sort(sortby)
                .skip((actualPage - 1) * moviesPerPage).limit(moviesPerPage)
                    .then((movies) => {
                        
                    

                    res.render('movies/movies', {genres, movies, chosenGenreItem, rate})
            })
            } else {
                return Movie.find({vote_average: { $gte: body.vote_average }, lang: res.locals.lang, release_date: filterDate.release_date }).limit(35)
                .sort(sortby)
                .skip((actualPage - 1) * moviesPerPage).limit(moviesPerPage)    
                    .then((movies) => {
                    res.render('movies/movies', {genres, movies})
            })
            }


            
    
            
        })
    .catch(next)
}


module.exports.like = (req, res, next) => {
    const objectId = req.body.objectId
    const userId = req.session.userId

    User.findById(userId)
        .then((user) => {
            if (!user.likes.includes(objectId)) {
                return User.findByIdAndUpdate(userId, { $addToSet: { likes: objectId } },{ new: true })
                    .then(user => {
                        res.send({ success: true, user: user });
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).send({success: false, error: 'Error al enviar like'})
                    })
            } else {
                return User.findByIdAndUpdate(userId, { $pull: { likes: objectId } }, { new: true }) 
                    .then(user => {
                        res.send({success: true, user:user})
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).send({success: false, error: 'Error al borrar like'})
                    })
            }
        })
}

module.exports.favorites = (req, res, next) => {
    
    const userId = req.session.userId; 
    Genre.find()
    .then((genres) => {
        return User.findById(userId)
            .then((user) => {
                const ids = user.likes;
                return Movie.find({ _id: { $in: ids } })
                    .then((favMovies) => {
                        res.render('movies/movies', {favMovies, genres})
                    })

            })
    })
    .catch(next) 
} 
