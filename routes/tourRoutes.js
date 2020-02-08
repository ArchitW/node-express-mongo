const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
//Param Middleware runs on the tour-route which has ID//
router.param('id', (req, res, next, val) => {
  console.log(`ID=>${val}`);
  next();
});
//create a middleware
//check for name and price
// 400 for bad request

middleware = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'missing name and price' });
  }
  next();
};
router
  .route('/')
  .get(tourController.getAllTours)
  .post(middleware, tourController.postATour);

router
  .route('/:id')
  .get(tourController.getATour)
  .patch(tourController.updateATour)
  .delete(tourController.deleteATour);

module.exports = router;
