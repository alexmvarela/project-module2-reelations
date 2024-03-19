require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./configs/routes.config');

const bodyParser = require('body-parser');
const setViewLocals = require('./middlewares/setViewLocals');










//configs
require('./configs/hbs.config');
require('./configs/db.config');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', `${__dirname}/views`);

// MIDDELWARES


app.use(bodyParser.urlencoded({ extended: true }));


// SESSION MIDDLEWARES
const {session, loadUserSession} = require('./configs/session.config') // Coge el solo el atributo session del objeto session.config
app.use(session); 

app.use(loadUserSession);
app.use((req, res, next) => {
  res.locals.lang = req.session.lang || "EN";
  next();
});


app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.query = req.query;
  next();
});
app.use(setViewLocals);


// APP ROUTES
app.use('/', routes);


  


const port = 3000;
app.listen(port, () => console.log('App running at port 3000'));