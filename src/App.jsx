import React from "react";
import { Route,Routes, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Business from "./pages/Business";
import Pending from "./pages/Pending";
import BusinessRecords from "./pages/BusinessRecords";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import UserForgotPassword from "./pages/UserForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
function RequireAdmin({ children }) {
  const isAuth = !!localStorage.getItem('adminToken');
  return isAuth ? children : <Navigate to="/admin-login" replace />;
}
function App(){
    return <Routes>
    <Route path="/business" element ={<Business/>}/>
     <Route path="/dashboard" element={<RequireAdmin><Dashboard/></RequireAdmin>}/>
     <Route path="/reports" element={<RequireAdmin><Reports/></RequireAdmin>}/>
    <Route path="/pending" element={<RequireAdmin><Pending/></RequireAdmin>}/>
    <Route path="/business-records" element={<RequireAdmin><BusinessRecords/></RequireAdmin>}/>
    <Route path="/admin-register" element={<AdminRegister/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/forgot-password" element={<UserForgotPassword/>}/>
    <Route path="/reset-password" element={<ResetPassword/>}/>
    <Route path="/admin-login" element={<AdminLogin/>}/>
    <Route path="/admin-forgot-password" element={<AdminForgotPassword/>}/>
    <Route path="/admin-reset-password" element={<AdminResetPassword/>}/>
    </Routes>

}
export default App