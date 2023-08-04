import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PublicRoutes from "./components/Routes/PublicRoutes";
import Donar from "./pages/Dashboard/Donar";
import Hospital from "./pages/Dashboard/Hospital";
import Organization from "./pages/Dashboard/Organization";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Dashboard/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/admin/DonarList";
import HospitalList from "./pages/admin/HospitalList";
import OrganizationList from "./pages/admin/OrganizationList";
import AdminHomePage from "./pages/admin/AdminHomePage";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoutes>
              <DonarList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoutes>
              <HospitalList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminHomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoutes>
              <OrganizationList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoutes>
              <Analytics />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoutes>
              <Donar />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoutes>
              <Hospital />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/organization"
          element={
            <ProtectedRoutes>
              <Organization />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/consumer"
          element={
            <ProtectedRoutes>
              <Consumer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoutes>
              <Donation />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default App;
