import AdminNavbar from "../components/Admin/AdminNavbar";
import AdminFooter from "../components/Admin/AdminFooter";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="<div className='flex flex-col min-h-screen'>">
      <AdminNavbar />
      <div className=' flex-1'>{children}</div>
      <AdminFooter />
    </div>
  );
};

export default Layout;
