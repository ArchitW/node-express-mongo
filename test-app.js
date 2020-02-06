const express = require('express');

const app = express();

//basic
app.get('/basic',(req, res) => {
  res.send('I am basc Route');
});
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello From the server Side',
    app: 'Natours'
  });
});

//Post Data
app.post('/', (req, res) => {

var t =(req.query);
  res.json({
   // message : 'You can Post to this End-Point',
  message:t
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

/*
URL Designing CRUD
tours (plural)
/addNewTour => POST /tours
/getTour    => GET /tours/7:id
/updateTour => [PUT/PATCH] /tours/7 (put : have to send all resources, patch: need to send resources that needs to get updated)
/deleteTour => DELETE /tours/7


2 or more res at same time
/getToursByUser => GET /users/3/tours
 */