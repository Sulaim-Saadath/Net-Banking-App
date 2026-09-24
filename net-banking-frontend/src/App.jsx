import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FirstLoginPage from "./pages/FirstLoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import CustomerDashboard from "./pages/CustomerDashBoard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import TellerDashboard from "./pages/TellerDashBoard";
import TransferPage from "./pages/TransferPage";
import TransactionHistory from "./pages/TransactionHistory";
import CustomerProfile from "./pages/CustomerProfile";
import TellerCustomers from "./pages/TellerCustomers";
import TellerTransactions from "./pages/TellerTransactions";
import AdminUserDetails from "./pages/AdminUserDetails";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/first-login" element={<FirstLoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
        <Route
          path="/teller"
          element={
            <ProtectedRoute allowedRole="TELLER">
              <TellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/transfer"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <TransferPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/transactions"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <TransactionHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teller/customers"
          element={
            <ProtectedRoute allowedRole="TELLER">
              <TellerCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teller/transactions"
          element={
            <ProtectedRoute allowedRole="TELLER">
              <TellerTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:userId"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminUserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users/:userId"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminUserDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
