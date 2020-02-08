const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getAllTours = (req, res) => {
  // send back all tours
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours
    }
  });
};
exports.getATour = (req, res) => {
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
exports.postATour = (req, res) => {
  //Post Tours
  //console.log(req.body);
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id: id, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
  //res.send('done');
};
exports.updateATour = (req, res) => {
  const { id } = req.params; // from url
  console.log(JSON.stringify(req.body)); // from json body
  res.status(200).json({
    status: 'success',
    message: `Upaded Tour with ID ${id} `
  });
};
exports.deleteATour = (req, res) => {
  const { id } = req.params; // from url
  res.status(204).json({
    status: 'success',
    message: `Deleted Tour with ID ${id} `
  });
};
