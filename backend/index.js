import express from "express";
import expensesRouter from "./routes/expenses.js";

const app = express();
app.use(express.json());
app.use("/expenses", expensesRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port 3000");
});