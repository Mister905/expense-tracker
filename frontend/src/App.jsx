import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filters from './components/Filters';

function App() {
  return (
    <>
      <Header />
      <ExpenseForm />
      <ExpenseList />
      <Filters />
    </>
  )
}

export default App
