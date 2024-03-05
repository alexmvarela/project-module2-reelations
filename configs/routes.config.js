const express = require('express');
const misc = require('../controllers/home.controller')
const tmdb = require('../configs/tmdb.config')

const router = express.Router();

router.get('/', misc.home)

module.exports = router