const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        adult: {
            type: Boolean,
        },
        original_language: {
            type: String
        },
        original_title: {
            type: String
        },
        overview: {
            type: String
        },
        popularity: {
            type: Number
        },
        poster_path: {
            type: String
        },
        release_date: {
            type: String
        },
        title: {
            type: String
        },
        vote_average: {
            type: Number
        },
        vote_count: {
            type: Number
        },
        image: {
            type: String
        },
        genre_ids:{
            type: [Number]
        } ,
        id: {
            type: Number
        },
        lang: {
            type: String
        }

    }
);

movieSchema.pre('save', function (next) {
    this.image = `https://image.tmdb.org/t/p/w342${this.poster_path}`;
    next();
});

movieSchema.pre('save', function (next) {
    this.lang = `EN`;
    next();
});


const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
