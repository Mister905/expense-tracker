import { useState, useEffect } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseBeingEdited, setExpenseBeingEdited] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const handleSaveExpense = async (expenseData) => {
    try {
      if (expenseBeingEdited) {
        const updated = await updateExpense(expenseBeingEdited.id, expenseData);
        setExpenses((prev) =>
          prev.map((e) => (e.id === expenseBeingEdited.id ? updated : e))
        );
        setExpenseBeingEdited(null);
      } else {
        const newExpense = await createExpense(expenseData);
        setExpenses((prev) => [...prev, newExpense]);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to submit expense:", error);
    }
  };

  const handleEditExpense = (expense) => {
    setExpenseBeingEdited(expense);
    setIsFormOpen(true);
  };

  const handleDeleteExpense = async (expenseID) => {
    try {
      await deleteExpense(expenseID);
      setExpenses((prev) => prev.filter((expense) => expense.id !== expenseID));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  return (
    <>
      <Header
        isFormOpen={isFormOpen}
        onAddExpense={() => setIsFormOpen(true)}
      />
      <ExpenseList
        expenses={expenses}
        onEdit={handleEditExpense}
        onDelete={handleDeleteExpense}
      />
      {isFormOpen && (
        <ExpenseForm
          initialData={expenseBeingEdited}
          onSubmit={handleSaveExpense}
          onCancel={() => {
            setIsFormOpen(false);
            setExpenseBeingEdited(null);
          }}
        />
      )}
      <Filters />
    </>
  );
}

export default App;
