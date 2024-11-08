import React from "react";
import Header from "../../Screens/Header/Header";
import { Outlet } from "react-router-dom";
//import './HrDashboard.css';
import EmployeeSidenav from "./EmployeeSidenav/EmployeeSidenav";

function EmployeeDashboard() {
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
        className="addjobDetails"
      ></div>
            <Header />

            <div className="d-flex h-[90dvh] w-[100%]">
            <div className="col-3 col-md-4 col-xl-3  sticky">

            <EmployeeSidenav />
            </div>
            <div className="col-9 col-md-8 col-xl-9  d-flex justify-content-center align-items-center">
          <Outlet />
        </div>
      </div>
    </div>
    
  );
}

export default EmployeeDashboard;
