const Genre = require('../models/genre.model')

module.exports.list = (req, res, next) => {

    
        Genre.find()
            .then((genres) => {
                res.render('movies/movies', {genres})
            })


}
