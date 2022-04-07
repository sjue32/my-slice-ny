const express = require('express');
const path = require('path');

const dataController = require(path.resolve(__dirname, '../controllers/dataController.js'));

const router = express.Router();

// route to read reviews
router.get('/', dataController.getReview, (req, res) => {
  console.log('------> made it back into getReview route from getReview middleware');
  res.status(200).json(res.locals.review);
});

// route to add review
router.post('/', dataController.addReview, (req, res) => {
  console.log('-----------> made it back into addReview route handler from addReview middleware');
  res.status(200).json(res.locals.addReview);
});


// route to see store data
router.get('/stores', dataController.getStore, (req, res) => {
  console.log('-----------> made it back into getStore route handler from addStore middleware')
  res.status(200).json(res.locals.store);
});

// route to add a new store
router.post('/stores', dataController.addStore, (req,res) => {
  console.log('--------> made it back into route hndler for addStore');
  res.status(200).json(res.locals.newStore);
});





module.exports = router;