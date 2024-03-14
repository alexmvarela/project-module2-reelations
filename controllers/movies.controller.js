const Genre = require('../models/genre.model')
const Movie = require('../models/movie.model')
const User = require('../models/user.model')
const mongoose = require('mongoose')
const List = require('../models/list.model')

module.exports.list = (req, res, next) => {

    if (Object.keys(req.query).length === 0 ) {

        const genreQuery = Genre.find();
        const animationQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [16] }}).limit(35)
        const actionQuery =  Movie.find({lang: res.locals.lang, genre_ids: { $in: [28] }}).limit(35)
        const comedyQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [35] }}).limit(35)
        const thrillerQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [53] }}).limit(35)
        const horrorQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [27] }}).limit(35)
        const dramaQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [18] }}).limit(35)
        const documentalQuery = Movie.find({lang: res.locals.lang, genre_ids: { $in: [99] }}).limit(35)
        const listQuery = List.find({owner: req.user.id}).limit(4)


        Promise.all([genreQuery, animationQuery, actionQuery, comedyQuery, thrillerQuery, horrorQuery, dramaQuery, documentalQuery, listQuery])
            .then(([genres, animationResult, actionResult, comedyResult, thrillerResult, horrorResult, dramaResult, documentalResult, listResult]) => {
                                
                    res.render('movies/movies', {animationResult, genres, actionResult, comedyResult, thrillerResult, horrorResult, dramaResult, documentalResult, listResult})
            })
            .catch(next)
    } else {
        let rate = req.query.vote_average || "0"

        Genre.find()
            .then((genres) => {
                const query = req.query;
                const filterDate = {};

                if(req.query.page <= 0) req.query.page = 1;

                const actualPage = req.query.page ? parseInt(req.query.page, 10) : 1;
                const moviesPerPage = 35;
                const moviesToSkip = (actualPage - 1) * moviesPerPage;
                const nextPage = actualPage + 1
                const prevPage = actualPage - 1


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
                    genres.forEach(g => {
                        if (g.name == chosenGenreItem) {
                            g.selected = true
                        }
                    }) 
                    return Movie.find({genre_ids: {$in: [query.genre]},
                        vote_average: { $gte: query.vote_average },
                        lang: res.locals.lang,
                        release_date: filterDate.release_date
                    })
                    .sort(sortby)
                    .skip(moviesToSkip).limit(moviesPerPage)
                        .then((movies) => {
                        return List.find({owner: req.user.id}).limit(4)
                            .then((listResult) => {
                                res.render('movies/movies', {genres, movies, chosenGenreItem, rate, actualPage, query, nextPage, prevPage, listResult})

                            })

                    })
                } else {
                    
                    return Movie.find({vote_average: { $gte: query.vote_average }, lang: res.locals.lang, release_date: filterDate.release_date }).limit(35)
                    .sort(sortby)
                    .skip(moviesToSkip).limit(moviesPerPage)    
                        .then((movies) => {
                        return List.find({owner: req.user.id}).limit(4)
                            .then((listResult) => {
                                res.render('movies/movies', {genres, movies, actualPage, query, nextPage, prevPage, listResult})
                                
                            })
                    })
                }
            })
        .catch(next)
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
        List.find().limit(4)
            .then((listResult) => {
                return User.findById(userId)
                .then((user) => {
                    const ids = user.likes;
                    return Movie.find({ _id: { $in: ids } })
                        .then((favMovies) => {
                            res.render('movies/movies', {favMovies, genres, listResult})
                        })

                })
            })
        
    })
    .catch(next) 
} 

module.exports.playList = (req, res, next) => {
    
    const listId = req.params.listId; 
    Genre.find()
    .then((genres) => {
        return List.find() 
            .then((listResult) => {
                return List.findById(listId)
                .then((list) => {

                
                    const listName = list.name
                    const ids = list.movies;

                    if(ids.length > 0) {

                    return Movie.find({ _id: { $in: ids } })
                        .then((listMovies) => {         
                            
                           
                            res.render('movies/movies', {genres, listMovies, listName, listResult })
                    

                        })
                    } else {
                        res.render('movies/movies', {genres, listError: 'Empty list', listName, listResult })
                    }

                })
                
            })
        
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