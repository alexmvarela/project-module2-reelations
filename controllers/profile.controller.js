const { default: mongoose } = require('mongoose')
const { findById } = require('../models/movies.model')
const User = require('../models/user.model')
const showEdit = true
const bcrypt = require("bcrypt");
const List = require('../models/list.model')
const Review = require('../models/review.model')
const Movie = require('../models/movies.model')


module.exports.editProfile = (req, res, next) => {
    
    res.render('users/profile', {showEdit})
}

module.exports.profileInfo = (req, res, next) => {
    const showInfo = true
    res.render('users/profile')
}

module.exports.doEditProfile = (req, res, next) => {
    const userId = res.locals.currentUser._id
    const body = req.body
    

    if(body.password) {

        if(body.password.length < 10) {
            res.status(400).render('users/profile',  {showEdit, errors: { password: 'The password is too short, at least 10 characters are required.'}})
        } else {
            bcrypt.hash(body.password, 2, (err, hashedPassword) => {
                
                    User.findByIdAndUpdate(userId, {
                        $set: {
                            name: body.name,
                            username: body.username,
                            email: body.email,
                            password: hashedPassword,
                            bgcolor: body.bgcolor,
                            avatar: body.avatar
                        }
                    }, { runValidators: true, new: true })
                        .then((user) => {
                            res.redirect('/profile')
                        })
                        .catch((error) => {
                            if (error instanceof mongoose.Error.ValidationError) {
                                res.status(400).render('users/profile',  {showEdit, errors: { password: 'The password is too short, at least 10 characters are required.'}})
                                console.log(error)
                            } else {
                                next(error)
                            }
                        })

                    });
            }
    } else {
        User.findByIdAndUpdate(userId, {name: body.name, username: body.username, email: body.email, bgcolor: body.bgcolor, avatar: body.avatar},{runValidators: true, new: true} )
        .then((user) => {
            res.redirect('/profile')
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('users/profile',  {showEdit})
                console.log(error)
            } else {
                next(error)
            }
        })
    }
}

module.exports.showPlaylists = (req, res, next) => {
    const owner = res.locals.currentUser._id
    const showPlaylists = true
    List.find({"owner": owner })
        .then((lists) => {

            if(lists.length > 0) {
                res.render('users/profile', {showPlaylists, lists})
            } else {
                res.render('users/profile', {showPlaylists, errors: { list: 'Empty list'}})
            }
        })
        .catch(next)
}

module.exports.deletePlaylist = (req, res, next) => {
    const listId = req.body.listId

    List.findByIdAndDelete(listId)
        .then(() => {
            res.redirect('/playlists')
        })
        .catch(next)
}

module.exports.showReviews = (req, res, next) => {
    const owner = req.query.owner;
    const showReviews = true

    Review.find({"owner": owner})
        .then((reviews) => {
            if(reviews.length > 0) {
                const promises = reviews.map(review => {
                    return Movie.findOne({ id: review.movie_id, lang: res.locals.lang })
                });

                Promise.all(promises)
                    .then((moviesResult) => {

                        reviews.forEach((rev, index) => {
                            rev.movie = moviesResult[index]
                        })
                        res.render('users/profile', {showReviews, reviews})
                    })
                    .catch(next);
                
            } else {
                res.render('users/profile', {showReviews, errors: { review: 'You have no reviews'}})
            }
        })
        .catch(next)
}

module.exports.deleteRev = (req, res, next) => {
    const { revId } = req.params
    const movieObjectId = req.body.movieObjectId
    
    Review.findByIdAndDelete(revId)
        .then(() => res.redirect(`/profile-reviews?owner=${res.locals.currentUser._id}`))
        
        
        .catch(next)
}

module.exports.deleteAcc = (req, res, next) => {
 
    const userId = req.body.delUserId
    
    User.findByIdAndDelete(userId)
        .then(() => res.redirect(`/`))
        
        
        .catch(next)
}