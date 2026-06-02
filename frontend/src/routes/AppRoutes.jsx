import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import LandingPage from "../pages/LandingPage"
import LoginPage from "../pages/LoginPage"
import DashboardPage from "../pages/DashboardPage"
import BusinessSetupPage from "../pages/BusinessSetupPage"
import BusinessSelectionPage from "../pages/BusinessSelectionPage"
import ExpensesPage from "../pages/ExpensesPage"
import IncomePage from "../pages/IncomePage";
import AnalyticsPage from "../pages/AnalyticsPage";
import TransactionsPage from "../pages/TransactionsPage";
import SettingsPage from "../pages/SettingsPage";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/business-setup" element={<BusinessSetupPage />} />
        <Route
  path="/businesses"
  element={
    <ProtectedRoute>
      <BusinessSelectionPage />
    </ProtectedRoute>
  }
/>


        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/expenses"
  element={<ExpensesPage />}
/>

<Route
  path="/income"
  element={<IncomePage />}
/>

<Route path="/transactions" element={<TransactionsPage />} />
<Route path="/analytics" element={<AnalyticsPage />} />
<Route path="/settings" element={<SettingsPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes