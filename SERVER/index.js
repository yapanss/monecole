require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var eleveRoute = require('./routes/eleve');
var personnelRoute = require('./routes/personnel');
var classeRoute = require('./routes/classe');
var evaluationRoute = require('./routes/evaluation');
var emploiclasseRoute = require('./routes/emploiclasse');
var emploiprofRoute = require('./routes/emploiprof');
var configGetRoute = require('./routes/config').getRoutes;
var configPostPutDeleteRoute = require('./routes/config').postPutDeleteRoutes;
var ressourceRoute = require('./routes/ressource');
var cahiertexteRoute = require('./routes/cahiertexte');
var authRoute = require('./routes/auth');
var authMiddleware = require('./middlewares/auth');

var app = express();

const credentials = process.env.MONGO_URI
const PORT = process.env.PORT;

mongoose.connect(credentials, (err,db) => {
  if(err) console.log(err)
  else {
  	console.log('Successfully connected to database '+db.name)
  }
}, {useNewUrlParser: true, useFindAndModify: false});

app.use(express.static('photos'))
app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res){
  res.send('Home');
})
authRoute(app);
configGetRoute(app);

authMiddleware(app);

eleveRoute(app);
personnelRoute(app);
classeRoute(app);
evaluationRoute(app);
configPostPutDeleteRoute(app);
emploiclasseRoute(app);
emploiprofRoute(app);
ressourceRoute(app)
cahiertexteRoute(app)

app.listen(PORT, console.log(`Server listening on port ${PORT}`))

    