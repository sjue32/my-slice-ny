const path = require('path');
const db = require(path.resolve(__dirname, '../models/mySliceModels.js'));

// build out error object function
const createErrObj = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `dataController.${method} middleware error ${type} ---> ERROR: ${err} `,
    status: 500,
    message: { err: 'An error has occured. Please check server logs.' }
  }
};

const dataController = {};

// read review
dataController.getReview = (req, res, next) => {
  console.log(`-----------> inside getReview`);
  const text = 'SELECT cast(date as varchar), cheese_score, crust_score, plain_score, slice_review, name FROM reviews INNER JOIN stores ON store_id = stores._id';
  db.query(text)
  .then(response => {
    console.log(`------------> inside getReview, post query, reviews: ${response.rows}`);
    res.locals.review = response.rows;
    next();
  }).catch(err => next(createErrObj({
        method: 'getReview',
        type: '',
        err: err
  })));

};
// add review
dataController.addReview = (req, res, next) => {
  // declare review data from req.body
  const { date, cheese_score, crust_score, slice_review, store_id } = req.body;
  const plain_score = cheese_score + crust_score;

  const text = 'INSERT INTO reviews (date, cheese_score, crust_score, plain_score, slice_review, store_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const params = [date, cheese_score, crust_score, plain_score, slice_review, store_id];

  // ADD REVIEW SQL QUERY
  db.query(text, params)
  .then(response => {
    console.log(`----------> PAST addReview query, response: ${response.rows}`);
    res.locals.addReview = response.rows[0];
    // next();
  }).catch(err => next(createErrObj({
    method: 'addReview',
    type: '',
    err: err
  })));
  // declare new variables for updated scores and avg's
  let new_cheese_score = cheese_score;
  let new_crust_score = crust_score;
  let new_review_count = 1;

  // retrieve existing scores data from stores table
  const textOldScores = 'SELECT name, total_cheese_score, total_crust_score, review_count FROM stores WHERE _id = $1';
  const paramsOldScores = [store_id];
  console.log(`------------> just before query for old scores, store_id value is ${store_id}`);
  db.query(textOldScores, paramsOldScores)
  .then(response => {
    console.log(`------------> post select query for old scores: ${response.rows}`);
    console.log(response.rows[0].name);
    // declare variables for requested data
    const { total_cheese_score } = response.rows[0];
    const { total_crust_score } = response.rows[0];
    const { review_count } = response.rows[0];
    // condition: add old scores are not null, add to new scores 
    if(total_cheese_score) new_cheese_score += total_cheese_score;
    if(total_crust_score) new_crust_score += total_crust_score;
    if(review_count) new_review_count += review_count;
  }).then(() => {
      // inside another then block
      console.log(`inside THEN BLOCK, after query for old scores, before query to update scores, store_id: ${store_id}`);
      // calculate new averages for cheese_avg, crust_avg, avg_score
      const new_cheese_avg = Number(Number.parseFloat(new_cheese_score / new_review_count).toFixed(2));
      const new_crust_avg = Number(Number.parseFloat(new_crust_score / new_review_count).toFixed(2));
      const new_avg_score = Number(Number.parseFloat((new_cheese_score + new_crust_score) / new_review_count).toFixed(2));
      // now make update query
      const textUpdateScores = 'UPDATE stores SET total_cheese_score = $1, cheese_avg = $2, total_crust_score = $3, crust_avg = $4, review_count = $5, avg_score = $6 WHERE _id = $7 RETURNING *'; 
      const paramsUpdateScores = [new_cheese_score, new_cheese_avg, new_crust_score, new_crust_avg, new_review_count, new_avg_score, store_id];
      // UPDATE SQL QUERY
      db.query(textUpdateScores, paramsUpdateScores)
      .then(response => {
        console.log(`-------------> post UPDATE STORES TABLE QUERY, response ${response.rows}`);
        res.locals.updatedStore = response.rows[0];
        // finally can invoke next() to exit this middleware function which
        // required adding a new entry into REVIEWS TABLE, a query to get scores from STORES TABLE,
        // and updating scores and avg's at STORES TABLE.
        next();
      }).catch(err => next(createErrObj({
        method: 'addReview(updating new scores section)',
        type: 'query to update STORES TABLE',
        err: err
      })));
  }).catch(err => next(createErrObj({
    method: 'addReview(getting old scores section)',
    type: 'query to select old scores from STORES TABLE',
    err: err
  })));
  
};

// access store data (one location) - via id and req.params
dataController.getStore = (req, res, next) => {
  console.log(`-------------> made it into getStore middleware!!!`);
  const text = 'SELECT * from stores';
  db.query(text).
  then(response => {
    console.log(`inside getStore middleware, query response: ${response.rows}`);
    res.locals.store = response.rows;
    next();
  }).catch(err => next(createErrObj({
    method: 'getStore',
    type: '',
    err: err
  })));

// access store data (MULTIPLE LOCATIONS) - sorted

};
// add store
dataController.addStore = (req, res, next) => {
  console.log(`-----------> ENTERED  addStore middleware`);
  const text = 'INSERT INTO stores (name, city, borough, slice_price) VALUES ($1, $2, $3, $4) RETURNING *';
  // pull data from req.body
  const { name, city, borough, slice_price } = req.body;
  const params = [ name, city, borough, slice_price ];
  db.query(text, params)
  .then(response => {
    console.log(`---------------> addStore middleware, post query, response ${response.rows}`);
    res.locals.newStore = response.rows;
    next();
  }).catch(err => next(createErrObj({
    method: 'addStore',
    type: '',
    err: err
  })));

};

// export 
module.exports = dataController;