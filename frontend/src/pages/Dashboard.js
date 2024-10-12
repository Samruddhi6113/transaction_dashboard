import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import TransactionStats from '../components/TransactionStats';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        {/* Add remaining months */}
      </select>
      <input
        type="text"
        placeholder="Search Transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TransactionStats month={month} />
      <TransactionTable month={month} search={search} />
      <BarChart month={month} />
      <PieChart month={month} />
    </div>
  );
};

export default Dashboard;
