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

app.get('/api/v1/tours/:id',(req, res) => {
  console.log(req.params);
})

app.get('/api/v1/tours/:id/optional_param?',(req, res) => {
  console.log(req.params);
})
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

*/

/* Basic Routing*/

const CallBackFunction = ((req, res) => {/* return body */})
app.[get|post|patch|delete]('URI', CallBackFunction)


const getAllTours = (req, res) => {});
app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', postATour);
app.get('/api/v1/tours/:id', getATour);
app.patch('/api/v1/tours/:id', updateATour);
app.delete('/api/v1/tours/:id', deleteATour);

/* Routes Separation */
app
  .route('/URL/To/End-Point')
  .get(getAllTours)
  .post(postATour);
//with param
app
  .route('/URL/To/End-Point/:id')
  .post(middleware, tourController.postATour);

/* Routing Refactor */
//routes.js
const controller = require('controller');
const routes = express.Router();
router.routes('/').get(controller.getMethod)

//controller.js
export getMethod = ((req, res)=>{ /* do stuff here */});
// app.js
app.use('PATH/TO/URL/V1', routes);
//ex:app.use('/api/v1/tours', tourRouter);


/*Param Middleware runs on the route which has ID */
router.param('id', (req, res,next, val) => {
 console.log('ID=>' + val);
 next();
});


/*
Calling middleware function before insert.
checks if name and price is empty
 */
middleware = ((req , res, next) => {
  if (!req.body.name || !req.body.price){
    return res.status(400).json({status:'fail',message:'missing name and price'})
  }
  next();
});
router
  .route('/')
  .post(middleware, tourController.postATour);


/* Serving Static Files */
// serve static files
app.use(express.static(`${__dirname}public/`));