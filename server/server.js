const express = require('express');
const path = require('path');
const app = express();

const reviewsRouter = require(path.resolve(__dirname, './routes/reviews.js'));

const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Things are fine here before incoming requests ------>');


// handle static requests
// app.use('/', express.static(path.resolve(__dirname, './client')));
app.get('/client/stylesheets/styles.css' , (req, res) => {
  res.status(200).type('css').sendFile(path.join(__dirname, './client/stylesheets/styles.css'));
});

// serves build folder containing bundle.js
app.use('/build', express.static(path.join(__dirname, '../build')));

// define route handlers
app.use('/reviews', reviewsRouter);

app.get('/', (req, res) => {
  console.log('Entered GET request for root, should be serving index.html ----->');
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// catch-all route handler
app.use((req, res) => {
  console.log('-----------> catch-all route handler');
  res.status(404).json('------------> Wrong route');
});

// express global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

// start server

app.listen(PORT, () => {
    console.log(`-----------> LISTENING ON PORT ${PORT}`);
});

// DO I NEED TO EXPORT? MODULE.EXPORTS ???
