const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI ;

mongoose.connect(MONGODB_URI)
    .then(() => console.info(`Connected to database ${MONGODB_URI}`))
    .catch((error) => console.error('An error has ocurred trying to connect to the database'));