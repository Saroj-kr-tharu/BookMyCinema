const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    showId: {
        type: Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    seats: {
        type: [String],  
        required: true
    },
    totalPrice: {
        type: Number, 
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    ticketQRCode: {
        type: String, // URL or base64 string for the QR code
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking; 