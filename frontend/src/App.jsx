import { useState, useEffect } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";
import { getExpenses, createExpense } from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

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

  const handleAddExpense = async (expense) => {
    try {
      console.log('derp');
      const newExpense = await createExpense(expense);
      setExpenses((prev) => [...prev, newExpense]);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  return (
    <>
      <Header onAddExpense={() => setShowForm(true)} />
      <ExpenseList expenses={expenses} />
      {showForm && (
        <ExpenseForm
          onSubmit={handleAddExpense}
          onCancel={() => setShowForm(false)}
        />
      )}
      <Filters />
    </>
  );
}

export default App;
