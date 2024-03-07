require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./configs/routes.config');

const bodyParser = require('body-parser');

const session = require('express-session') 







//configs
require('./configs/hbs.config');
require('./configs/db.config');

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// MIDDELWARES

app.use(express.static(__dirname + '/public'));

app.use(session({secret: "asdasd0"}))
app.use((req, res, next) => {
    res.locals.lang = req.session.lang || "EN";
    next();
  });



app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);


  


const port = 3000;
app.listen(port, () => console.log('App running at port 3000'));