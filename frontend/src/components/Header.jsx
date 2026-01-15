import React from "react";
import "../styles/components/_header.scss";

const Header = ({ isFormOpen, onAddExpense }) => {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <h1>Expense Tracker</h1>
          {/* Disable New Expense Button if form is already open for edit */}
          <button
            className="btn-custom btn-new-expense"
            onClick={onAddExpense}
            disabled={isFormOpen}
          >
            New Expense +
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
