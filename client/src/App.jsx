import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "./components/UserLogin";
import Applications from "./pages/Application";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ListOfCompany from "./components/Admin/ListOfCompany";
import ListOfStudent from "./components/Admin/ListOfStudent";
import ListOfStudentApplied from "./components/Admin/ListOfStudentApplied";
import AddPlacementRecord from "./components/Admin/AddPlacementRecord";
import PlacementRecordLayout from "./components/PlacementRecordLayout";
import PlacementRecords from "./components/PlacementRecords";
import CompanyForm from "./components/CompanyForm";
import React from "react";
import AddStudent from "./components/Admin/AddStudent";
import ResumeChecker from "./components/resume/Resume";

const App = () => {
  const { companyToken, showUserLogin, adminToken } = useContext(AppContext);

  return (
    <div>
      {showUserLogin && <UserLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route
          path='/applications'
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route path='/create-company' element={<CompanyForm />} />
        <Route path='/dashboard' element={<Dashboard />}>
          {companyToken ? (
            <>
              <Route path='add-job' element={<AddJob />} />
              <Route path='manage-job' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplications />} />
            </>
          ) : null}
        </Route>
        {adminToken && (
          <>
            <Route
              path='/admin/dashboard'
              element={
                <Layout>
                  <AdminDashboard />
                </Layout>
              }
            >
              <Route path='list-of-company' element={<ListOfCompany />} />
              <Route
                path='list-of-student-registered'
                element={<ListOfStudent />}
              />
              <Route
                path='list-of-student-applied-for-company'
                element={<ListOfStudentApplied />}
              />
              <Route
                path='add-placement-record'
                element={<AddPlacementRecord />}
              />
              <Route path='add-students-record' element={<AddStudent />} />
            </Route>
          </>
        )}
        <Route
          path='/placement-records'
          element={
            <PlacementRecordLayout>
              <PlacementRecords />
            </PlacementRecordLayout>
          }
        />
        <Route
          path='/resume-checker'
          element={
            <PlacementRecordLayout>
              <ResumeChecker />
            </PlacementRecordLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
