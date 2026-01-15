import { useState, useEffect } from "react";
import testExpenses from "./data/testExpenses";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import Filters from "./components/Filters";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./services/api";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const USE_TEST_DATA = true; // toggle this for dev/testing

function App() {
  const [expenses, setExpenses] = useState(USE_TEST_DATA ? testExpenses : []);
  const [filteredExpenses, setFilteredExpenses] = useState(
    USE_TEST_DATA ? testExpenses : []
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseBeingEdited, setExpenseBeingEdited] = useState(null);
  const [filters, setFilters] = useState({
    vendor: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (!USE_TEST_DATA) {
      const fetchExpenses = async () => {
        try {
          const data = await getExpenses();
          setExpenses(data);
        } catch (error) {
          console.error("Failed to fetch expenses:", error);
        }
      };
      fetchExpenses();
    }
  }, []);

  useEffect(() => {
    console.log(filters);
    const filtered = expenses.filter((expense) => {
      const vendorMatch =
        // If a filter field is empty, !filters.<filter> is true, so all values pass that filter.
        !filters.vendor ||
        expense.vendor.toLowerCase().includes(filters.vendor.toLowerCase());
      const categoryMatch =
        !filters.category ||
        expense.category.toLowerCase().includes(filters.category.toLowerCase());

      const expenseDate = dayjs(expense.date); // convert string to Day.js

      const startDateMatch =
        !filters.startDate ||
        expenseDate.isSameOrAfter(dayjs(filters.startDate), "day");

      const endDateMatch =
        !filters.endDate ||
        expenseDate.isSameOrBefore(dayjs(filters.endDate), "day");

      return vendorMatch && categoryMatch && startDateMatch && endDateMatch;
    });

    setFilteredExpenses(filtered);
  }, [expenses, filters]);

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

  const handleSetFilters = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  return (
    <>
      <Header
        isFormOpen={isFormOpen}
        onAddExpense={() => setIsFormOpen(true)}
      />
      <div className="expenses-section">
        <h1 className="h1-expenses">Expenses</h1>
        <div className="expenses-layout">
          <ExpenseList
            expenses={filteredExpenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
          <Filters filters={filters} setFilters={handleSetFilters} />
        </div>
      </div>
      <Summary expenses={filteredExpenses} />
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
    </>
  );
}

export default App;
