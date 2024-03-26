const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const reviewSchema = new Schema(
    {
        author: {
            type: String,
        },
        content: {
            type: String
        },
        created_at: {
            type: String
        },
        movie_id: {
            type: Number,
            ref: 'Movie'
        },

        rating: {
            type: Number
        },
        owner: {
            type: String,
            ref: 'User'
        }
    }, {timestamps: true}
)

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;