// src/components/ExpenseCard.jsx
import React from "react";
import "../styles/components/_expenseItem.scss";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
const { amount, date, vendor, category } = expense;
  return (
    <div className="expense-card">
      <div className="expense-details">
        <span className="amount">${amount.toFixed(2)}</span>
        <span className="date">{date}</span>
        <span className="vendor">{vendor}</span>
        <span className="category">{category}</span>
      </div>
      <div className="expense-actions">
        {onEdit && (
          <button className="button" onClick={() => onEdit(expense)}>
            Edit
          </button>
        )}
        {onDelete && (
          <button className="button" onClick={() => onDelete(expense.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseItem;
