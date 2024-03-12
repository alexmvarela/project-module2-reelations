const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true
        },
        surname: {
            type: String,
            trim: true
        },
        username: {
            type: String,
            required: [true,'Username is required'],
            unique: true,
            trim: true,
            lowercase:true
        },
        email: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: 10
        },
        avatar: {
            type: String,
            default: "https://robohash.org/ecKARbAyhJ?set=set4"
        },
        bgcolor: {
            type: String,
            default: '#ffffff'
        },
        likes: {
           type: [String] 
        }
        
    },
    {timestamps: true}
);

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt  
            .hash(this.password, 2)
            .then((hash) => {
                this.password = hash
                next()
            })
            .catch(next)
    } else {
        next()
    }
})


userSchema.methods.checkPassword = function (pass) {
    return bcrypt.compare(pass, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;