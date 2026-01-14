import React from "react";
import "../styles/components/_header.scss";

const Header = ({ onAddExpense }) => {
  return (
    <>
      <header className="header">
        <h1>Expense Tracker</h1>
        <button className="button" onClick={onAddExpense}>
          New Expense
        </button>
      </header>
    </>
  );
};

export default Header;
