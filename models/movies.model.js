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
            type: Number,
        },
        vote_count: {
            type: Number
        },
        image: {
            type: String
        },
        genres:[
            {
                    name:{type:String},
                    id:{type:Number}
            }
        ],
        id: {
            type: Number
        },
        lang: {
            type: String
        },
        imdb_id: {
            type: String
        },
        production_countries: [
            {
                    name:{type:String},
            }
        ],
        runtime: {
            type: Number
        },
        cast: [
            {
                id: Number,
                known_for_department: String,
                name: String,
                profile_path: String,
                character: String,
            }
        ],
        crew: [
            {
                id: Number,
                known_for_department: String,
                name: String,
                profile_path: String,
                department: String,
                job: String
            }
        ],
        reviews: [
            {
                author: String,
                content: String,
                created_at: String,
                author_details: {
                    rating: Number
                }
            }
        ],
        movie_images: [
            {
                file_path: String
            }
        ],
        movie_recommendations: [
            {
                id: String,
                title: String,
                poster_path: String,
                genre_ids: [String]
            }
        ]

        

    }, {timestamps: true}
);

movieSchema.pre('save', function (next) {
    this.image = `https://image.tmdb.org/t/p/w342${this.poster_path}`;
    next();
});

// movieSchema.pre('save', function (next) {
//     this.lang = `EN`;
//     next();
// });


const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

//{ createdAt: { $exists: false } }
