const Tour = require('../models/tourModel');
const ApiFeatures = require('../utils/apiFeatures');

exports.checkID = async (req, res, next, val) => {
    console.log(`Tour ID is ${val}`);
    const tourExists = await Tour.exists({ _id: val });

    if (!tourExists) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Mandatory fields are missing',
        });
    }
    next();
};

exports.aliasTopTours = (req, res, next) => {
    req.query.pageSize = '5';
    req.query.sort = '-rating,price';
    req.query.fields = 'name,price,rating,summary,difficulty';
    next();
};

exports.getAllTours = async (req, res) => {
    try {
        // Initialize QueryHelper
        const features = new ApiFeatures(Tour.find(), req.query);

        // Apply all query modifiers
        features.paginate().filter().sort().limitFields();
        const tours = await features.query;
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};


exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getTourById = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({
                status: 'fail',
                message: 'Tour not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedTour) {
            return res.status(404).json({
                status: 'fail',
                message: 'Tour not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);

        if (!deletedTour) {
            return res.status(404).json({
                status: 'fail',
                message: 'Tour not found',
            });
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};


exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { rating: { $gte: 3 } }
            },
            {
                $group: {
                    _id: '$difficulty',
                    numTours: { $sum: 1 },
                    avgRatings: { $avg: '$rating' },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avg: { $avg: '$rating' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },

                }
            }
        ])

        res.status(200).json({
            status: 'success',
            data: stats,
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }

}