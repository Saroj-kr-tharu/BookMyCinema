const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    cast: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slideImage: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    genre: { required: true, type: Array },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie; 