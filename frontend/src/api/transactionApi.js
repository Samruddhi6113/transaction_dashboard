import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Adjust as per your backend URL

export const fetchTransactions = async (month, search, page = 1) => {
  const { data } = await axios.get(`${API_URL}/transactions`, { params: { month, search, page } });
  return data;
};

export const fetchStatistics = async (month) => {
  const { data } = await axios.get(`${API_URL}/statistics`, { params: { month } });
  return data;
};

export const fetchPriceRange = async (month) => {
  const { data } = await axios.get(`${API_URL}/price-range`, { params: { month } });
  return data;
};

export const fetchCategorySummary = async (month) => {
  const { data } = await axios.get(`${API_URL}/category-summary`, { params: { month } });
  return data;
};
