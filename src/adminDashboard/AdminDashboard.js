import React from "react";
import AdminSidenav from "./AdminSideNav/AdminSidenav";
import AdminHeader from "./AdminDashboardHeader/AdminHeader";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          zIndex: "-1",
          top: "0",
        }}
        className="addjobDetails totalPage"
      ></div>

      <AdminHeader />
      <div className="d-flex h-[90dvh] w-[100%]">
        <div className="col-3 col-md-4 col-xl-3  sticky">
          <AdminSidenav />
        </div>
        <div className="col-9 col-md-8 col-xl-9  d-flex justify-content-center align-items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
