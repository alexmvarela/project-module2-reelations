const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema(
    {
        id: {
            type: Number
        },
        name: {
            type: String
        }
    }
)

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;