const User = require('../models/user.model');
const mongoose = require('mongoose');
const createError = ('http-errors');
const bcrypt = require('bcrypt');

module.exports.create = (req, res, next) => {
    res.render('users/signup' )
}

module.exports.doCreate = (req, res, next) => {
    if(req.body.suAction === 'signup') {

    User.findOne({username: req.body.username})
        .then((user) => {
            if (user) {
                res.status(409).render('users/signup', {user: req.body, errors: {username:'Already exists'}})
            } else {
            
            const user = req.body;
            return User.create(user)
            .then(() => {
                res.redirect('/login')
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    res.status(400).render('users/signup', {user, errors: error.errors})
                    console.log(error)
                } else {
                    next(error)
                }
            })



            }
        })
        


    } else if (req.body.suAction === 'getAvt') {
        res.render('users/signup', {user: req.body})
    }
}

module.exports.login = (req, res, next) => {
    res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then((user) => {
            if (!user) {
                res.status(401).render('users/login', { user: req.body, errors: { password: 'Invalid email or password'} })
              } else {
                return user.checkPassword(req.body.password)
                    .then((match) => {
                        if (match) {
                            req.session.userId = user.id 
                            res.redirect('/')
                        } else {
                            res.status(401).render('users/login', {user: req.body, errors: {password: 'Invalid user name or password'}})
                        }
                    })
            }
        })
        .catch(next) 
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    req.session = null;
    res.clearCookie("connect.sid");
    res.redirect('/login');
  }