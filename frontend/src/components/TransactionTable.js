import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../api/transactionApi';

const TransactionTable = ({ month, search }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions(month, search, page);
      setTransactions(data);
    };
    loadTransactions();
  }, [month, search, page]);

  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.title}</td>
              <td>{tx.description}</td>
              <td>{tx.price}</td>
              <td>{new Date(tx.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TransactionTable;




