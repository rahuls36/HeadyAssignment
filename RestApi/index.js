
let express = require('express')

let app = express()

var port = process.env.PORT || 9000

let api_routes = require('./api_routes')

let bodyParser = require('body-parser')

let mongoose = require('mongoose')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/restcategories', { useNewUrlParser: true,  useUnifiedTopology: true});

var db = mongoose.connection

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


app.use(api_routes)

app.listen(port, function () {
     console.log("Running RestApi on port " + port);
});
