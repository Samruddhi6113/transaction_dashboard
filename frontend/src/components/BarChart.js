import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchPriceRange } from '../api/transactionApi';

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadPriceRange = async () => {
      const data = await fetchPriceRange(month);
      const prices = data.map((item) => item._id);
      const counts = data.map((item) => item.count);
      setChartData({
        labels: prices,
        datasets: [{
          label: 'Items in Price Range',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
      });
    };
    loadPriceRange();
  }, [month]);

  return <Bar data={chartData} />;
};

export default BarChart;
