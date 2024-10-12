// Inside backend/controllers/transactionController.js

const Transaction = require('../models/transactionModel');

// Helper function for month conversion
const getMonthNumber = (month) => {
  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12"
  };
  return months[month];
};

// Controller to get combined statistics, price range, and category data
exports.getCombinedData = async (req, res) => {
  const { month } = req.query;

  const startDate = new Date(`2024-${getMonthNumber(month)}-01`);
  const endDate = new Date(`2024-${getMonthNumber(month)}-31`);

  try {
    const [statistics, priceRanges, categories] = await Promise.all([
      // Aggregation for statistics
      Transaction.aggregate([
        { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
        {
          $group: {
            _id: null,
            totalSaleAmount: { $sum: '$price' },
            totalSoldItems: { $sum: { $cond: ['$sold', 1, 0] } },
            totalNotSoldItems: { $sum: { $cond: ['$sold', 0, 1] } }
          }
        }
      ]),

      // Aggregation for price range (bar chart)
      Transaction.aggregate([
        { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
            default: "901-above",
            output: {
              count: { $sum: 1 }
            }
          }
        }
      ]),

      // Aggregation for categories (pie chart)
      Transaction.aggregate([
        { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
        { $group: { _id: '$category', itemCount: { $sum: 1 } } }
      ])
    ]);

    res.json({ statistics, priceRanges, categories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
