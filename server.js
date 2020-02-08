const env = require('dotenv');
//console.log(app.get('env'))
//console.log(process.env)
env.config({path:'./config.env'});

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
