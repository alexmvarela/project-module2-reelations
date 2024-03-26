const express = require('express');
const home = require('../controllers/home.controller');
const user = require('../controllers/user.controller')
const movies = require('../controllers/movies.controller')
const router = express.Router();
const secure = require('../middlewares/auth.middleware')
const list = require('../controllers/list.controller')
const search = require('../controllers/search.controller')
const review = require('../controllers/review.controller')
const profile = require('../controllers/profile.controller')


const Movie = require('../models/movies.model')

// HOME
router.get('/', home.home);
router.post('/random-movie', home.filter);
router.get('/lang/:newLang' , (req, res) => {
    req.session.lang = req.params.newLang;
    res.redirect('/');
});

// SIGNUP

router.get('/signup', user.create);
router.post('/signup', user.doCreate);

// LOGIN

router.get('/login', user.login)
router.post('/login', user.doLogin)

// AVATAR

router.get('/get-avatar')

// PROFILE

router.get('/logout', user.logout);
router.get('/profile', secure.isAuthenticated, user.profile)
router.get('/edit-profile', secure.isAuthenticated, profile.editProfile)
router.get('/profile-info', secure.isAuthenticated, profile.profileInfo)
router.post('/edit-profile', secure.isAuthenticated, profile.doEditProfile)
router.post('/delete-playlist', secure.isAuthenticated, profile.deletePlaylist)

router.get('/playlists', secure.isAuthenticated, profile.showPlaylists)
router.get('/profile-reviews', secure.isAuthenticated, profile.showReviews)
router.post('/delete-rev-prof/:revId', secure.isAuthenticated, profile.deleteRev)

router.post('/delete-account', secure.isAuthenticated, profile.deleteAcc)



// MOVIES

router.get('/movies', secure.isAuthenticated, movies.list)
router.get('/movies/:movieId', secure.isAuthenticated, movies.detail)

//LISTS

router.post('/new-list',secure.isAuthenticated, list.create)
router.get('/lists/:listId', secure.isAuthenticated, movies.playList)

router.post('/delete-list', secure.isAuthenticated, list.delete)

router.post('/addto-list',secure.isAuthenticated, movies.addToList )

//FAV

router.post('/like',secure.isAuthenticated, movies.like)
router.get('/favorites',secure.isAuthenticated, movies.favorites)

//PAGES


//SEARCH
router.post('/search-movie', search.search);

//REVIEWS
router.post('/send-review', secure.isAuthenticated, review.create)

router.post('/vote-movie', secure.isAuthenticated, review.vote)

router.post('/delete-rev/:revId', secure.isAuthenticated, review.delete)

router.post('/edit-review/:revId', secure.isAuthenticated, review.edit)





module.exports = router;