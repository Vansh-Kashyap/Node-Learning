const express = require('express');
const tourController = require('./controller/tourController')
const { getAllTours, createTour, getTourById, getTourStats, deleteTour, updateTour, aliasTopTours } = tourController;


const router = express.Router()

router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/tour-stats').get(getTourStats)

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourById).delete(deleteTour).patch(updateTour)

module.exports = router