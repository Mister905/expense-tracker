import React from "react";
import "../styles/components/_expenseList.scss";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete, filters }) => {
  const empty_state_msg =
    filters.vendor || filters.category || filters.startDate || filters.endDate
      ? "No results match the current filters"
      : "No expenses available";

  return (
    <ul className="ul-expense-list">
      {expenses.length > 0 ? (
        expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })
      ) : (
        <li>{empty_state_msg}</li>
      )}
    </ul>
  );
};

export default ExpenseList;
