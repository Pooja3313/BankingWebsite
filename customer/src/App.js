import "./App.css";
import { Routes, Route } from 'react-router-dom'
import AllCustomer from './Components/AllCustomer/AllCustomer';
import Home from './Components/Home/Home'
import MoneyTransfer from "./Components/MoneyTransfer/MoneyTransfer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>    
      <ToastContainer  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllCustomer" element={<AllCustomer />} />
        <Route path="/MoneyTransfer/:id"  element={<MoneyTransfer />}/>
      </Routes>
    
    </>
  );
}

export default App;
