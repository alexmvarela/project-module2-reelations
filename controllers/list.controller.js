const User = require('../models/user.model');
const List = require('../models/list.model');
const mongoose = require('mongoose');
const createError = ('http-errors');

module.exports.create = (req, res, next) => {

    req.body.owner = req.user.id

    List.create(req.body)
        .then((list) => {
            res.send({ success: true });
        })
        .catch(next)

}