const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 8
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    joinedDate: {
        type: Date
    },
    movie_favourites: {
        type: [Number],
        default: null
    },
    tv_favourites: {
        type: [Number],
        default: null
    }
});

module.exports = mongoose.model('users', userSchema);