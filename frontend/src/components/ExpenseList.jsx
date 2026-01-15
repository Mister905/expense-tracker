import React from "react";
import "../styles/components/_expenseList.scss";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <ul className="ul-expense-list">
      {expenses.map((expense) => {
        return (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
};

export default ExpenseList;
