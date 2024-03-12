const User = require('../models/user.model');
const List = require('../models/list.model');
const mongoose = require('mongoose');
const createError = ('http-errors');

module.exports.create = (req, res, next) => {

    List.create(req.body)
        .then(() => {
            res.redirect('/movies')
        })
        .catch(next)

}