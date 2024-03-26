const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const listSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Playlist name is required'],
            minlength: [3, 'List name is not long enough: At least 3 chars']
        },
        movies: {
            type: [String]
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
        
    }
)

const List = mongoose.model('List', listSchema);
module.exports = List;