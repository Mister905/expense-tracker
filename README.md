# Expense Tracker

A full-stack CRUD application for managing expenses with filtering and real-time calculations. Built with Node.js/Express backend and React frontend, storing data in memory.

## Quick Start

**GitHub Repository**: https://github.com/Mister905/expense-tracker

**Prerequisites**: Node.js (v14+), npm

```bash
# Clone the repository
git clone https://github.com/Mister905/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Start both servers
npm start
```

The application will be available at `http://localhost:5173` (frontend) with the backend running on `http://localhost:3000`.

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **Styling**: SCSS
- **Date Handling**: Day.js
- **Utilities**: uuid, concurrently

## Features

- **Full CRUD Operations**: Create, read, update, and delete expenses
- **Filtering**: Filter by vendor, category, and date range (inclusive)
- **Dynamic Totals**: Total amount updates based on filtered results
- **CSV Export**: Download the currently filtered expenses as a CSV file
- **Responsive UI**: Mobile-friendly interface
- **Validation & Empty States**: Client/server validation with graceful empty state handling
- **Sorting**: Expenses displayed in descending order by date
- **Clear Filters**: Quickly reset all filter fields

## Design Choices & Notes

### In-Memory Storage
Uses an in-memory array for simplicity. Data persists only during server session.

### Day.js for Date Handling
Chosen for lightweight footprint (~2KB), intuitive API, and plugin system. Uses `isSameOrAfter` and `isSameOrBefore` plugins for inclusive date range filtering.

### SCSS Structure
Modular SCSS architecture with global variables/mixins and component-specific partials. Uses Flexbox for component alignment with mobile-first responsive design.

### Component Architecture
Components: Header, Filters, ExpenseList, ExpenseItem, ExpenseForm, Summary. State management handled at App component level with callbacks passed to children.

### Form Validation
In production, form validation and error handling would be handled using a library such as React Hook Form or Formik for robustness and maintainability.

### CSV Export
As a small bonus feature, the application allows exporting the currently filtered expenses to a CSV file. This is implemented as a frontend-only utility to keep the scope aligned with the take-home assignment.

### Additional Notes
- **CORS**: Configured in `backend/index.js` for cross-origin requests
- **Unique IDs**: Generated using `uuid` package on backend
- **State Management**: React useState hooks with state lifted to App component
- **Code Organization**: Modular components, API calls abstracted to service layer

## Project Structure

```
expense-tracker/
├── backend/
│   ├── index.js              # Express server with CORS
│   ├── routes/
│   │   └── expenses.js        # CRUD endpoints
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── styles/            # SCSS partials
│   │   ├── App.jsx            # Main component
│   │   └── main.jsx
│   └── package.json
└── package.json               # Root scripts
```

## API Endpoints

All endpoints prefixed with `/expenses`:

- **GET `/expenses`** → `{ expenses: [...] }`
- **POST `/expenses`** → Body: `{ amount, date, vendor, category }` → `{ message, expense }`
- **PUT `/expenses/:id`** → Body: `{ amount, date, vendor, category }` → `{ message, expense }`
- **DELETE `/expenses/:id`** → `{ message }`

**Expense Schema**: `{ id: string (UUID), amount: number, date: string (YYYY-MM-DD), vendor: string, category: string }`
