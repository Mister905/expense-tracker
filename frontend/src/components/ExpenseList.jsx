import React from "react";
import "../styles/components/_expenseList.scss";

const ExpenseList = ({ expenses }) => {
  return (
    <>
      <h1>Expenses</h1>
      <ul>
        {expenses.map(({ id, amount, date, vendor, category }) => {
          return (
            <li key={id}>
              {`Amount: ${amount} Date: ${date} Vendor: ${vendor} Category: ${category}`}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ExpenseList;
