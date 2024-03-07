const express = require('express');
const home = require('../controllers/home.controller');
const router = express.Router();

router.get('/', home.home);

router.post('/random-movie', home.filter);

router.get('/lang/:newLang' , (req, res) => {

    req.session.lang = req.params.newLang;
    res.redirect('/');
});


module.exports = router;