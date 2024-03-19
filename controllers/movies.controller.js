const Genre = require('../models/genre.model')
const Movie = require('../models/movies.model')
const User = require('../models/user.model')
const mongoose = require('mongoose')
const List = require('../models/list.model')
const getFromApi = require('../configs/api.config')
const createError = ('http-errors');


module.exports.list = (req, res, next) => {

    const genres = res.locals.genres;

    if (Object.keys(req.query).length === 0 ) {

        const animationQuery = Movie.find({lang: res.locals.lang, "genres.id": 16 }).limit(35)
        const actionQuery =  Movie.find({lang: res.locals.lang, "genres.id":28}).limit(35)
        const comedyQuery = Movie.find({lang: res.locals.lang, "genres.id":35}).limit(35)
        const thrillerQuery = Movie.find({lang: res.locals.lang, "genres.id":53}).limit(35)
        const horrorQuery = Movie.find({lang: res.locals.lang, "genres.id":27}).limit(35)
        const dramaQuery = Movie.find({lang: res.locals.lang, "genres.id":18}).limit(35)
        const documentalQuery = Movie.find({lang: res.locals.lang, "genres.id":99}).limit(35)


        Promise.all([ animationQuery, actionQuery, comedyQuery, thrillerQuery, horrorQuery, dramaQuery, documentalQuery ])
            .then(([ animationResult, actionResult, comedyResult, thrillerResult, horrorResult, dramaResult, documentalResult]) => {
                res.render('movies/movies', {animationResult, actionResult, comedyResult, thrillerResult, horrorResult, dramaResult, documentalResult})
            })
            .catch(next)
    } else {
        let rate = req.query.vote_average || "0"

        const query = req.query;
        const filterDate = {};
        const actualPage = req.query.page ? parseInt(req.query.page, 10) : 1;
        const moviesPerPage = 35;
        const moviesToSkip = (actualPage - 1) * moviesPerPage;
        let nextPage = actualPage + 1
        let prevPage = actualPage - 1

        if (req.query.page <= 0) req.query.page = 1;

            if (req.query.release_date !== '2030') {
                filterDate.release_date = { $gte: req.query.release_date, $lt: (+req.query.release_date + 9).toString() };
            } else {
                filterDate.release_date = { $gte: '1900'}
            }

            if (!query.vote_average) {
                query.vote_average = 0
            }

        
            const chosenGenre = genres.filter((genre) => genre.id === parseInt(query.genre, 10));    
            const order = !req.query.order ? -1 : parseInt(req.query.order, 10);
            const sortby = {};


            if (req.query.sortby) 
                sortby[req.query.sortby] = order;

            if(query.genre && chosenGenre) {
                const chosenGenreItem = chosenGenre[0].name
                

                res.locals.genres.forEach(g => {
                    if (g.name == chosenGenreItem) {
                        g.selected = true
                    }
                }) 
                return Movie.find({"genres.id":query.genre, vote_average: { $gte: query.vote_average },
                    lang: res.locals.lang,
                    release_date: filterDate.release_date
                })
                .sort(sortby)
                .skip(moviesToSkip).limit(moviesPerPage)
                    .then((movies) => {

                        if (actualPage === 1) {
                            prevPage = null
                        }
                        
                        if (movies.length / moviesPerPage !== 1) {
                            nextPage = null
                        }
                        
                        if (movies.length !== 0) {
                            res.render('movies/movies', { movies, chosenGenreItem, rate, actualPage, query, nextPage, prevPage})
                        }else {
                            res.render('movies/movies', {query, errors: { movie: 'We do not have any films with these specifications'}})
                        }
                    })
                    .catch(next)
        } else {
            
            return Movie.find({vote_average: { $gte: query.vote_average }, lang: res.locals.lang, release_date: filterDate.release_date }).limit(35)
            .sort(sortby)
            .skip(moviesToSkip).limit(moviesPerPage)    
                .then((movies) => {

                    if (actualPage === 1) {
                        prevPage = null
                    }
                    
                    if (movies.length / moviesPerPage !== 1) {
                        nextPage = null
                    }
                    
                    if (movies.length !== 0) {
                        res.render('movies/movies', { movies, actualPage, query, nextPage, prevPage})
                    }else {
                        res.render('movies/movies', {query, errors: { movie: 'We do not have any films with these specifications'}})
                    }
                })
                .catch(next)
        }
    }
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
                        res.status(500).send({success: false, errors: { like: 'Like error'}})
                    })
            } else {
                return User.findByIdAndUpdate(userId, { $pull: { likes: objectId } }, { new: true }) 
                    .then(user => {
                        res.send({success: true, user:user})
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).send({success: false, errors: { like: 'Like error'}})
                    })
            }
        })
}

module.exports.favorites = (req, res, next) => {
    
    const userId = req.session.userId; 
    User.findById(userId)
        .then((user) => {
            const ids = user.likes;
            return Movie.find({ _id: { $in: ids } })
                .then((favMovies) => {
                    if (favMovies.length === 0) {
                    res.status(400).render('movies/movies', {errors: { fav: 'You do not have favorites yet'}} )
                    }else{
                    res.render('movies/movies', {favMovies})
                    }
                })
                .catch(next)
        })
        .catch(next) 
} 

module.exports.playList = (req, res, next) => {
    
    const listId = req.params.listId; 
    List.findById(listId)
                .then((list) => {
                    const listName = list.name
                    const ids = list.movies;

                    if(ids.length > 0) {
                    return Movie.find({ _id: { $in: ids } })
                        .then((listMovies) => {           
                            res.render('movies/movies', {listMovies, listName })
                        })
                    } else {
                            res.status(400).render('movies/movies', {errors: { list: 'Empty list'}})
                    }
                })
                .catch(next) 
} 

module.exports.addToList = (req, res, next) => {
    const movieId = req.body.movieId;
    const listId = req.body.listId;

    List.findByIdAndUpdate(listId, { $addToSet: { movies: movieId } }, { new: true })
        .then((list) => {
            if (!list) {
                throw new Error('List not found');
            }
            res.send({ success: true, list });
        })
        .catch((error) => {
            console.error(error);
            next(error); 
        });
};

module.exports.detail = (req, res, next) => {
    const movieId = req.params.movieId;
    Movie.findById(movieId)
        .then(movie => {
                    res.render('movies/detail', {movie});
        })
        .catch(next)
};