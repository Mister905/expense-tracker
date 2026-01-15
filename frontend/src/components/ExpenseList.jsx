import React from "react";
import "../styles/components/_expenseList.scss";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
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
        <li>No expenses available</li>
      )}
    </ul>
  );
};

export default ExpenseList;
