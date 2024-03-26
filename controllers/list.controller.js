const User = require('../models/user.model');
const List = require('../models/list.model');
const mongoose = require('mongoose');
const Movie = require('../models/movies.model');
const createError = ('http-errors');

module.exports.create = (req, res, next) => {

    req.body.owner = req.user.id

        List.create(req.body)
        .then((list) => {
            res.send({ success: true, id: list._id });
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.send({ success: false, errors: error.errors });
            } else {
                console.error(error); 
                res.status(500).send({ success: false, message: 'Internal Server Error' });
            }
        });

}


module.exports.delete = (req, res, next) => {

    const listItemId = req.body.listItemId
    const listDel = req.body.listDel

    List.findByIdAndUpdate(listDel, { $pull: { movies: listItemId } }, { new: true })
        .then((item) => {
            console.log(item)



            res.send({success: true})
        })
        .catch(next)

}