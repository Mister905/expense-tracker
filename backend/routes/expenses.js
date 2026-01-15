import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

/*
    Expense object
    {
        id: string,
        amount: number,
        date: string, 
        vendor: string,
        category: string
    }
*/

// Create the in-memory store
const expenses = [];

// POST /expenses
router.post("/", (req, res) => {
  const { amount, date, vendor, category } = req.body;

  // Basic validation
  if (amount === undefined) {
    return res.status(400).json({ error: "Amount is required" });
  }
  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }
  if (!vendor) {
    return res.status(400).json({ error: "Vendor is required" });
  }
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  // Create new expense
  const newExpense = {
    id: uuidv4(),
    amount,
    date,
    vendor,
    category,
  };

  // Save to in-memory array
  expenses.push(newExpense);

  // Respond with created object
  res
    .status(201)
    .json({ message: "Expense created successfully", expense: newExpense });
});

// GET /expenses
router.get("/", (req, res) => {
  res.status(200).json({ expenses });
});

// PUT /expenses/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { amount, date, vendor, category } = req.body;

  const expense = expenses.find((e) => e.id === id);
  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  // Validate all required fields
  if (amount === undefined || date === undefined || !vendor || !category) {
    return res
      .status(400)
      .json({
        message: "All fields (amount, date, vendor, category) are required",
      });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: "Amount must be a positive number" });
  }

  // Perform the update
  expense.amount = amount;
  expense.date = date;
  expense.vendor = vendor;
  expense.category = category;

  res.status(200).json({ message: "Expense updated successfully", expense });
});

// DELETE /expenses/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Expense not found" });
  }

  expenses.splice(index, 1);
  res.status(200).json({ message: "Expense deleted successfully" });
});

export default router;
