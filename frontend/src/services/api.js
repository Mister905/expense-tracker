import axios from "axios";

const BASE_URL = "http://localhost:3000/expenses";

// GET all expenses
export const getExpenses = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data.expenses;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

// POST new expense
export const createExpense = async (expense) => {
  try {
    const res = await axios.post(BASE_URL, expense);
    return res.data.expense;
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
};

// PUT update an existing expense
export const updateExpense = async (id, updatedExpense) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedExpense);
    return res.data.expense;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

// DELETE an expense
export const deleteExpense = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data.message;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
