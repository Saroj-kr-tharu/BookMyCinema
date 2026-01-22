const mongoose = require('mongoose');

const { Schema } = mongoose;


const showSchema = new Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    cinemaId: {
        type: Schema.Types.ObjectId,
        ref: 'Cinema',
        required: true
    },
    screenName: {
        type: String,
        required: true
    },
    showTime: [{
        type: Date,
        required: true
    }],
    seats: [
        {
            seatNumber: { type: String, required: true },
            status: { type: String, required: true, enum: ['Available', 'Reserved', 'SoldOut', 'Unavailable',] },
            price: { type: Number, required: true }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

});



const Show = mongoose.model('Show', showSchema);
module.exports = Show; 