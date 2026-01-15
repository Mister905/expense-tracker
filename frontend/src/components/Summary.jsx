import React from "react";
import "../styles/components/_summary.scss";

// Exports the provided expenses (typically filtered) to a downloadable CSV file.
// Kept dependency-free and frontend-only to avoid expanding application scope.
const exportToCSV = (expenses) => {
  // Define CSV column order explicitly for predictable output
  const headers = ["Date", "Vendor", "Category", "Amount"];

  // Map expense objects to CSV row values
  const rows = expenses.map((e) => [e.date, e.vendor, e.category, e.amount]);

  // Combine headers and rows into CSV-formatted string
  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

  // Create a downloadable CSV file in-memory
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Trigger browser download
  const link = document.createElement("a");
  link.href = url;
  link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();

  // Clean up object URL after download
  URL.revokeObjectURL(url);
};

const Summary = ({ expenses }) => {
  // Sum amounts
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  return (
    <>
      <div className="summary">
        <div className="summary-total">
          <span>Total Expenses:</span>
          <span className="total-amount">${total.toFixed(2)}</span>
        </div>

        <div className="summary-btn-export">
          <button
            className="btn-custom"
            disabled={!expenses.length}
            onClick={() => exportToCSV(expenses)}
          >
            Export to CSV
          </button>
        </div>
      </div>
    </>
  );
};

export default Summary;
