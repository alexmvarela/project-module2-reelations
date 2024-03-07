require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./configs/routes.config');



//configs
require('./configs/hbs.config');
require('./configs/db.config');

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);


app.use('/', routes);

app.use(express.static(__dirname + '/public'));


const port = 3000;
app.listen(port, () => console.log('App running at port 3000'));