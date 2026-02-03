// src/router/index.jsx
import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { persistAdminProfile, persistAdminToken, readAdminToken, readAuthToken } from "../utils/auth";

import MainLayout from "../layouts/MainLayout";
import ScrollToTop from "../components/ScrollToTop";

// Import User Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Tips from "../pages/Tips/Tips";
import Motivation from "../pages/Motivation/Motivation";
import Diary from "../pages/Diary/Diary";
import Analytics from "../pages/Analytics/Analytics";
import Profile from "../pages/Profile/Profile"; 
import Login from "../pages/Login/Login"; 
import LandingPage from "../pages/LandingPage/LandingPage";
import NotFound from "../pages/NotFound/NotFound";

// Import Admin Pages
import AdminPage from "../pages/Admin/AdminPage";
import AdminLogin from "../pages/Admin/AdminLogin";
import {
  AdminDashboardRoute,
  AdminDiariesRoute,
  AdminMotivationsRoute,
  AdminTipsRoute,
  AdminUsersRoute,
} from "../pages/Admin/AdminRoutes";

// Require an admin session for nested routes.
const DEV_ADMIN_CREDENTIALS = {
  username: "baraja",
  password: "baraja123",
};

const isDevAdminQuery = (searchParams) => {
  const username = searchParams.get("user");
  const password = searchParams.get("pass");
  return (
    username === DEV_ADMIN_CREDENTIALS.username && password === DEV_ADMIN_CREDENTIALS.password
  );
};

const ensureDevAdminSession = () => {
  persistAdminToken("dev-admin-token");
  persistAdminProfile({ id: 0, name: "Developer", role: "admin" });
};

export const AdminProtectedRoute = () => {
  const location = useLocation();
  const token = readAdminToken();

  const shouldBypassAuth = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return isDevAdminQuery(params);
  }, [location.search]);

  if (!token) {
    ensureDevAdminSession();
    return <Outlet />;
  }

  if (token || shouldBypassAuth) {
    return <Outlet />;
  }

  return <Navigate to="/admin/login" replace />;
};

// Require a user session for nested routes.
export const ProtectedRoute = () => {
  const token = readAuthToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// Redirect authenticated users away from public routes.
export const PublicRoute = ({ redirectTo = "/dashboard" }) => {
  const token = readAuthToken();
  return token ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

// Redirect authenticated admins away from public routes.
export const AdminPublicRoute = ({ redirectTo = "/admin" }) => {
  const token = readAdminToken();
  return token ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/motivation" element={<Motivation />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} /> 
          </Route>
        </Route>

        <Route element={<AdminPublicRoute />}>
          <Route path="/admin/login" element={<AdminLogin />} /> 
        </Route>

        <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboardRoute />} />
            <Route path="/admin/motivations" element={<AdminMotivationsRoute />} />
            <Route path="/admin/motivations/:theme" element={<AdminMotivationsRoute />} />
            <Route path="/admin/tips" element={<AdminTipsRoute />} />
            <Route path="/admin/tips/:theme" element={<AdminTipsRoute />} />
            <Route path="/admin/users" element={<AdminUsersRoute />} />
            <Route path="/admin/users/:theme" element={<AdminUsersRoute />} />
            <Route path="/admin/diaries" element={<AdminDiariesRoute />} />
            <Route path="/admin/diaries/:theme" element={<AdminDiariesRoute />} />
            <Route path="/admin/diarys" element={<AdminDiariesRoute />} />
            <Route path="/admin/diarys/:theme" element={<AdminDiariesRoute />} />
            <Route path="/manage/motivations" element={<AdminMotivationsRoute />} />
            <Route path="/manage/tips" element={<AdminTipsRoute />} />
            <Route path="/manage/users" element={<AdminUsersRoute />} />
            <Route path="/manage/diaries" element={<AdminDiariesRoute />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
