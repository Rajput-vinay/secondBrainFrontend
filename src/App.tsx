import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

import { Navigate } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
       
          <Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>

          <ToastContainer />
        
      </BrowserRouter>
    </>
  );
}

export default App;
