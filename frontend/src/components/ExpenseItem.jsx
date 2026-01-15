// src/components/ExpenseCard.jsx
import React from "react";
import "../styles/components/_expenseItem.scss";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const { amount, date, vendor, category } = expense;
  return (
    <div className="expense-card">
      <div className="expense-details">
        <div><span className="fw-bold">Vendor:</span> {vendor}</div>
        <div><span className="fw-bold">Category:</span> {category}</div>
        <div><span className="fw-bold">Amount:</span> ${amount.toFixed(2)}</div>
        <div><span className="fw-bold">Date:</span> {date}</div>
      </div>
      <div className="expense-actions">
        <button type="button" className="btn-custom" onClick={() => onEdit(expense)}>
          Edit
        </button>
        <button type="button" className="btn-custom btn-warning" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
