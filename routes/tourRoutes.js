const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
//Param Middleware runs on the tour-route which has ID//
router.param('id', (req, res,next, val) => {
 console.log('ID=>' + val);
 next();
});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.postATour);


router
  .route('/:id')
  .get(tourController.getATour)
  .patch(tourController.updateATour)
  .delete(tourController.deleteATour);

module.exports = router;