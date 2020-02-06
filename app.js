const express = require('express');
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'));


const app = express();
//middleware : a function that can modify incoming request data.
app.use(express.json());
app.get('/api/v1/tours', (req, res) => {
// send back all tours
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours
    }
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

// patch
app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id; // from url
  console.log( JSON.stringify(req.body)); // from json body
  res.status(200).json({
    status:'success',
    message:`Upaded Tour with ID ${id} `
  })
});

//delete
app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id; // from url
  res.status(204).json({
    status:'success',
    message:`Deleted Tour with ID ${id} `
  })
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
