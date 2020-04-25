const express = require("express");

const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);

mongoose.set('debug', true);

const bodyParser = require("body-parser");

const app = express();

const helmet = require('helmet');

const compression = require('compression');

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

const utilityService = require('./utility/utility.service');

/* Helmet can help protect app from some well-known web
vulnerabilities by setting HTTP headers appropriately.*/
app.use(helmet());

// Enabling Gzip compression
app.use(compression());

//---- Set headers ----
app.use((req, res, next) => {

  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use(bodyParser.json()); // Parse application/json data :)

//---- Routes ----
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

// Global error handler middleware
app.use((error, req, res, next) => {
 utilityService.handleGlobalError(error, res);
});


//---Database connection script----
mongoose.connect(
    "mongodb+srv://suraj:9gjlnlt1Q0DrmJdx@cluster0-fwqsc.mongodb.net/tweeter?retryWrites=true&w=majority"
)
.then(result => {
    const server = app.listen(8080);
    const io = require('./socket').init(server);
    
    // Socket event listener
    io.on('connection', socket => {
      console.log('Client connected');
      
    });
})
.catch(err => console.log('Database connection failed!!'));