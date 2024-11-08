import React from "react";
import Sidenav from "../../Screens/Sidenav/Sidenav";
import HrHeader from "./HRHeader/HrHeader";
import { Outlet } from "react-router-dom";

function HrDashboard() {
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
      <HrHeader />
      <div className="d-flex h-[90dvh] w-[100%]">
        <div className="col-3 col-md-4 col-xl-3  sticky">
          <Sidenav />
        </div>
        <div className="col-9 col-md-8 col-xl-9  d-flex justify-content-center align-items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;
