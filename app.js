const express = require('express');
const morgan = require('morgan');




const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}public/`));

app.use('/api/v1/tours', tourRouter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

app.use('/api/v1/users', userRouter);

module.exports = app;

//mongodb+srv://gq-user:Test1234@ds215219.mlab.com:15219/natours
