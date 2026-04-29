import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import PublicLayout from "../layouts/publicLayout";
import DashboardLayout from "../layouts/dashboardLayout";
import Landing from "../pages/landing";
import Register from "../features/auth/Register";
import Home from "../pages/dashboard/home";
import Settings from "../pages/dashboard/settings";
import ZenGarden from "../pages/dashboard/zenGarden";
import Study from "../pages/dashboard/study";
import ProtectedRoute from "./protRoutes";
import AuthLayout from "../layouts/authLayout";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/zengarden" element={<ZenGarden />} />
          <Route path="/study" element={<Study />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;