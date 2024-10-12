import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchCategorySummary } from '../api/transactionApi';

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadCategorySummary = async () => {
      const data = await fetchCategorySummary(month);
      const categories = data.map((item) => item._id);
      const counts = data.map((item) => item.itemCount);
      setChartData({
        labels: categories,
        datasets: [{
          label: 'Categories',
          data: counts,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }],
      });
    };
    loadCategorySummary();
  }, [month]);

  return <Pie data={chartData} />;
};

export default PieChart;
