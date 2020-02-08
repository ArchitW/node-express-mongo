const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();


router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.postATour)
/*
// this middleware will add timestamp for get,patch and delete since it is added
// before them
app.use((req,res,next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
})
*/

router
  .route('/:id')
  .get(tourController.getATour)
  .patch(tourController.updateATour)
  .delete(tourController.deleteATour)

 module.exports = router;