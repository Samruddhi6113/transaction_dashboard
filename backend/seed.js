const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('./models/transactionModel');

mongoose.connect('mongodb://localhost/transactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(data);
    console.log('Database seeded successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.log('Error seeding database:', err.message);
    mongoose.disconnect();
  }
};

seedDatabase();
