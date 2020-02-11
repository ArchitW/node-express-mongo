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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
