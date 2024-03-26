
const Movie = require('../models/movies.model')
const createError = ('http-errors');


module.exports.search = (req, res, next) => {

    const query = req.query;

    const actualPage = req.query.page ? parseInt(req.query.page, 10) : 1;
    const moviesPerPage = 35;
    const moviesToSkip = (actualPage - 1) * moviesPerPage;
    let nextPage = actualPage + 1
    let prevPage = actualPage - 1

    const title = req.body.title;
    const regex = new RegExp(title, 'i');

    if (req.body.action !== 'searchAll') {
    

        Movie.find({lang: res.locals.lang,  title: regex }).limit(5)
            .then(movies => {
                res.json(movies);
                
            })
            .catch(err => {
                res.status(500).json({ message: 'Error', error: err.message });
            });

    }else{
        

            Movie.find({lang: res.locals.lang,  title: regex }).skip(moviesToSkip).limit(moviesPerPage)
            .then((movies) => {

                const searchTitle = req.body.title

                if (actualPage === 1) {
                    prevPage = null
                }
                
                if (movies.length / moviesPerPage !== 1) {
                    nextPage = null
                }
                
                if (movies.length !== 0) {
                    res.render('movies/movies', { movies, searchTitle, actualPage, query, nextPage, prevPage})
                }else {
                    res.render('movies/movies', {query, searchTitle, errors: { movie: 'We do not have any films with these specifications'}})
                }
            })
    }
}

