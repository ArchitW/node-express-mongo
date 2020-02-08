const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();


//morgan MW
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/v1/tours', tourRouter);
// this middleware will add timestamp only for users route
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

app.use('/api/v1/users', userRouter);

module.exports = app;