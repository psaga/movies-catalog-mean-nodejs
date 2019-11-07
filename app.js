const express = require('express'),
      mongoose = require('mongoose'),
      config = require('./config'),
      initMongo = require('./utils/mongo'),
      cors = require("cors"),
      app = express(),
      bodyParser = require('body-parser');

app.set("mongoose", mongoose);
app.set("config", config);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

require("./models/movie")(mongoose);

// Register the routes and mount them all at /api
app.use("/api", require("./routes/movies")(app, express.Router()));

initMongo (config, mongoose);


app.listen(config.port, () => {
    console.log('Listening on port: ', config.port);
});