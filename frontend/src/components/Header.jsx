import React from "react";
import "../styles/components/_header.scss";

const Header = ({ isFormOpen, onAddExpense }) => {
  return (
    <>
      <header className="header">
        <h1>Expense Tracker</h1>
        {/* Disable New Expense Button if form is already open for edit */}
        <button className="button" onClick={onAddExpense} disabled={isFormOpen}>
          New Expense
        </button>
      </header>
    </>
  );
};

export default Header;
