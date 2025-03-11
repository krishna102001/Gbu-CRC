import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentLogin from "./components/StudentLogin";
import Applications from "./pages/Application";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";

const App = () => {
  const { showRecruiterLogin, companyToken, showStudentLogin, adminToken } =
    useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      {showStudentLogin && <StudentLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/recruiter-login' element={<RecruiterLogin />} />
        <Route
          path='/applications'
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route path='/dashboard' element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path='add-job' element={<AddJob />} />
              <Route path='manage-job' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplications />} />
            </>
          ) : null}
        </Route>
        {adminToken ? (
          <Route
            path='/admin/dashboard'
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
            }
          />
        ) : (
          <Route
            path='/admin/login'
            element={
              <Layout>
                <AdminLogin />
              </Layout>
            }
          />
        )}
      </Routes>
    </div>
  );
};

export default App;
