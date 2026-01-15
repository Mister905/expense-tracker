import React, { useState, useEffect } from "react";
import "../styles/components/_expenseForm.scss";

const ExpenseForm = ({ initialData, onSubmit, onCancel }) => {
  // Controlled inputs
  const [vendor, setVendor] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setAmount(initialData.amount);
      setDate(initialData.date);
      setVendor(initialData.vendor);
    }
  }, [initialData]);

  // Disable submit if required fields are empty
  const isDisabled = !amount || !date || !vendor || !category;

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = {
      amount: Number(amount),
      date,
      vendor: vendor.trim(),
      category: category.trim(),
    };

    onSubmit(expense);

    if (!initialData) {
      // Only reset on create to avoid clearing fields before the edit form closes
      setVendor("");
      setCategory("");
      setAmount("");
      setDate("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="expense-form">
        <div>*All fields are required</div>

        <div>
          <label htmlFor="vendor">
            Vendor:{` `}
            <input
              id="vendor"
              name="vendor"
              type="text"
              placeholder="Vendor"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="category">
            Category:{` `}
            <input
              id="category"
              name="category"
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
        </div>

        <div>
          {/* Link label to input via htmlFor/id for screen readers and click-to-focus */}
          <label htmlFor="amount">
            Amount:{` `}
            <input
              id="amount"
              name="amount"
              type="number"
              // step="0.01" reflects currency-style values and to guide browser validation
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="date">
            Date:{` `}
            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>

        <div className="actions">
          <button type="submit" className="btn-custom" disabled={isDisabled}>
            {/* Button label communicates mode */}
            {initialData ? "Update" : "Submit"}
          </button>
          <button type="button" className="btn-custom" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
