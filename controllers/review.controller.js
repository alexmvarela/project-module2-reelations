const Review = require('../models/review.model')
const Movie = require('../models/movies.model')
const User = require('../models/user.model')

module.exports.create  = (req, res, next) => {
    Movie.findOne({lang: res.locals.lang, "id": req.body.movie_id })
        .then((movie) => {
            return Review.create(req.body)
                .then(() => res.redirect(`/movies/${movie._id}#revH2`))
                .catch(next)
        })
    
}

module.exports.vote = (req, res, next) => {
    const id = req.body.movieId
    const movieObjectId = req.body.movieObjectId

    Movie.findOne({"id": id, "lang": res.locals.lang})
        .then((movie) => {

                if(!req.body.rating) req.body.rating = 0

                const totalVotes = movie.vote_average * movie.vote_count + parseInt(req.body.rating, 10)
                const newVoteCount = movie.vote_count + 1
                const newAvg = (totalVotes / newVoteCount).toFixed(3);
                

                if(res.locals.currentUser.voted_movies.includes(movie._id)) {
                    console.log('Already voted')
                } else {
                    return Movie.updateOne({ id: id }, { vote_average: newAvg, vote_count: newVoteCount }, {new: true})
                        .then((movieUp) => {
                            return User.updateOne({username: res.locals.currentUser.username},{ $push: {voted_movies: movie._id}} ,{new: true})
                                .then(() => console.log(movie._id, res.locals.currentUser.username))
                        })
                        .catch(next)
                    }
            })
        .then(() => {
            res.redirect(`/movies/${movieObjectId}`);
        })
        .catch((error) => {
            next(error);
        });
}


module.exports.delete = (req, res, next) => {
    const { revId } = req.params
    const movieObjectId = req.body.movieObjectId
    
    Review.findByIdAndDelete(revId)
        .then(() => res.redirect(`/movies/${movieObjectId}#revH2`))
        
        .catch(next)
}

module.exports.edit = (req, res, next) => {
    const { revId } = req.params
    const newContent = req.body.content
    const newRating = req.body.rating
    const movieObjectId = req.body.movieObjectId

    Review.findByIdAndUpdate(revId, {content: newContent, rating: newRating})
        .then(() => res.redirect(`/movies/${movieObjectId}#revH2`))
        .catch(next)
}
