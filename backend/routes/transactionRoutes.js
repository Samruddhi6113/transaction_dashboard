const express = require('express');
const {
  initializeDatabase,
  getTransactions,
  getStatistics,
  getPriceRange,
  getCategorySummary,
  getCombinedData,
} = require('../controllers/transactionController'); // Make sure this path is correct

const router = express.Router();

// Define the routes
router.get('/initialize', initializeDatabase);
router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/price-range', getPriceRange);
router.get('/category-summary', getCategorySummary);
router.get('/combined', getCombinedData);
module.exports = router;
