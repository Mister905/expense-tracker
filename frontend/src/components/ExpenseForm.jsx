import React, { useState } from "react";
import "../styles/components/_expenseForm.scss";

const ExpenseForm = ({ onSubmit, onCancel }) => {

  // Controlled inputs
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");

  // Disable submit if required fields are empty
  const isDisabled = !amount || !date || !vendor || !category;

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = {
      amount: Number(amount),
      date,
      vendor,
      category,
    };

    onSubmit(expense);

    // Clear form fields after submission
    setAmount("");
    setDate("");
    setVendor("");
    setCategory("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} isDisabled={isDisabled}>
        <input
          type="number"
          // I set step="0.01" on the amount input to reflect currency-style values and to guide browser validation
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div className="actions">
          <button className="button" type="submit">
            Submit
          </button>
          <button className="button" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
