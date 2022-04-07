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

// define route handlers
app.use('/reviews', reviewsRouter);

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
