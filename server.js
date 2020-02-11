const mongooes = require('mongoose');
const env = require('dotenv');
//console.log(app.get('env'))
//console.log(process.env)
env.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<DBPASSWORD>',
  process.env.DB_PASSWORD
);

mongooes
  .connect(DB, {
    //deprication warnings
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    console.log('DB Connected');
    //console.log('DB conntected :', con.connections);
  });

//Local
//mongooes.connect(process.env.DATABASE_LOCAL,{}).then(con =>{
// console.log("local connected")});

// Blueprint to create documents, Schema : Describes the data.

const tourSchema = new mongooes.Schema({
  name: {
    //Schema type options
    type: String,
    required: [true, 'A tour must have a name'], // Errors if false
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5 // Default value
  },
  price: Number
});

//Create Model
const Tour = mongooes.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'A new Tour',
  rating: 4.7,
  price: 6000
});
testTour.save()
  .then(doc => console.log(doc))
  .catch(err => console.log(err));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
