const Genre = require('../models/genre.model'); 
const List = require('../models/list.model'); 


const setViewLocals = (req, res, next) => {
    Genre.find()
        .then(genres => {
            res.locals.genres = genres;

            if (req.user) {
                return List.find({owner: req.user.id}).limit(4)
                    .then(listResult => {
                        res.locals.listResult = listResult;
                        next();
                })
            } else {
                next();
            }
        })  
        .catch(err => {
            console.error('Error al obtener géneros o listas:', err);
            res.status(500).send('Error al obtener géneros o listas');
        });
};

module.exports = setViewLocals;

