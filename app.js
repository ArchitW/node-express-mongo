const express = require('express');
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8'));


const app = express();
app.get('/api/v1/tours',(req, res) => {
// send back all tours
res.status(200).json({
  status:'success',
  data:{
    tours
  }
})
});





const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
