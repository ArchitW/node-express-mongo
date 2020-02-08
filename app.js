const express = require('express');
const fs = require('fs');
const morgan = require('morgan');



const app = express();
const userRouter = require('./routes/userRoutes')
const tourRouter = require('./routes/tourRoutes')

//morgan MW
app.use(morgan('dev'));
app.use(express.json());


/*
app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', postATour);
app.get('/api/v1/tours/:id', getATour);
app.patch('/api/v1/tours/:id', updateATour);
app.delete('/api/v1/tours/:id', deleteATour);
*/
/* Tours */


/* END USERS */
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users', userRouter)

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
