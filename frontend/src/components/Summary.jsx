import React from "react";
import "../styles/components/_summary.scss";

const Summary = ({ expenses }) => {
  // Sum amounts
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  return (
    <>
      <div className="summary">
        <span>Total Expenses:</span>
        <span className="total-amount">${total.toFixed(2)}</span>
      </div>
    </>
  );
};

export default Summary;
