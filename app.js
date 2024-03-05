const express = require('express');
const app = express();
const routes = require('./configs/routes.config');


//configs
require('./configs/hbs.config')

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);


app.use('/', routes);

const port = 3000;
app.listen(port, () => console.log('App running at port 3000'));