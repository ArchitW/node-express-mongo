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

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
