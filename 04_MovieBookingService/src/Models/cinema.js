const mongoose = require('mongoose');

const { Schema } = mongoose;

const cinemaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    managerId: {
        type: String,
        required: true
    },
    
    screens: [
        {
            screenName: { type: String, required: true },
            layout: { type: String, required: true },
            projectionType: { type: String, enum: ['IMAX 2D', 'IMAX 3D', '4DX',], required: true },
            soundSystem: { type: String, enum: ['Dolby Atmos', 'IMAX Sound', 'DTS:X'], required: true },
            seatPricing: {
                premium: { type: Number, required: true },
                platinum: { type: Number, required: true }
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;


