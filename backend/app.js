const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes'); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (ensure you use the correct MongoDB URI)
mongoose.connect('mongodb://localhost/transactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the transaction routes
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
