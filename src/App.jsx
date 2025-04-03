import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/routes/Auth";
import PrivateRoute from "./components/routes/PrivateRoute";
import Home from "./components/routes/Home";
import TransactionPanel from "./components/routes/Transaction";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin" element={
           <PrivateRoute> 
          <Home /> 
          </PrivateRoute>
          } />
        <Route path="/Transaction" element={
           <PrivateRoute> 
          <TransactionPanel /> 
          </PrivateRoute>
          } />
        
      </Routes>
    </Router>
  );
}
