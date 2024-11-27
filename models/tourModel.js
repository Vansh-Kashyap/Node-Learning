const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
    },
    duration: {
        type: Number,
        required: [true, "A tour must have some duration"],

    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a max group size"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must be having some difficulty"]

    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true
    },

    description: {
        type: String,
        required: [true, "A tour must be having a description"]
    },
    imageCover: {
        type: String,
        required: [true, "A tour must be having a cover image"]

    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
