const express = require('express');
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));


const app = express();
//middleware : a function that can modify incoming request data.
app.use(express.json());

// Middleware , always use next()
// Order of middleware maters.. be careful.
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

const getAllTours = (req, res) => {
// send back all tours
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours
    }
  });
};
const getATour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'failure',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};
const postATour = (req, res) => {
  //Post Tours
  //console.log(req.body);
  const id = (tours[tours.length - 1].id) + 1;
  const newTour = Object.assign({ id: id }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
  //res.send('done');
};
const updateATour = (req, res) => {
  const id = req.params.id; // from url
  console.log(JSON.stringify(req.body)); // from json body
  res.status(200).json({
    status: 'success',
    message: `Upaded Tour with ID ${id} `
  });
};
const deleteATour = (req, res) => {
  const id = req.params.id; // from url
  res.status(204).json({
    status: 'success',
    message: `Deleted Tour with ID ${id} `
  });
};
/*
app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', postATour);
app.get('/api/v1/tours/:id', getATour);
app.patch('/api/v1/tours/:id', updateATour);
app.delete('/api/v1/tours/:id', deleteATour);
*/

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(postATour);

// this middleware will add timestamp for get,patch and delete since it is added
// before them
app.use((req,res,next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
})
app
  .route('/api/v1/tours/:id')
  .get(getATour)
  .patch(updateATour)
  .delete(deleteATour);


const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
