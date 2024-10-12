import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../api/transactionApi';

const TransactionStats = ({ month }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const loadStatistics = async () => {
      const data = await fetchStatistics(month);
      setStats(data);
    };
    loadStatistics();
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale: {stats.totalSaleAmount}</p>
      <p>Total Sold Items: {stats.totalSoldItems}</p>
      <p>Total Unsold Items: {stats.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionStats;
























