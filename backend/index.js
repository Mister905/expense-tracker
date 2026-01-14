import express from "express";
import cors from "cors";
import expensesRouter from "./routes/expenses.js";

const app = express();
const PORT = 3000;

// Enable CORS for all origins
// Browsers block requests across origins unless the server explicitly allows it
app.use(cors());

app.use(express.json());
app.use("/expenses", expensesRouter);

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});