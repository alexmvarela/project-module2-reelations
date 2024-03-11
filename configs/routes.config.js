const express = require('express');
const home = require('../controllers/home.controller');
const user = require('../controllers/user.controller')
const movies = require('../controllers/movies.controller')
const router = express.Router();
const secure = require('../middlewares/auth.middleware')

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


// router.get('/profile', secure.isAuthenticated)

// MOVIES

router.get('/movies', secure.isAuthenticated, movies.list)
router.post('/movies', secure.isAuthenticated, movies.filter)





module.exports = router;