import React from "react";
import AdminPage from "./AdminPage";

export const AdminDashboardRoute = () => <AdminPage />;

export const AdminMotivationsRoute = () => <AdminPage initialModal="motivation" />;

export const AdminTipsRoute = () => <AdminPage initialModal="tips" />;

export const AdminUsersRoute = () => <AdminPage initialView="users" />;

export const AdminDiariesRoute = () => <AdminPage initialView="diaries" />;
