import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeSidenav.css";
//import "../../../Screens/Sidenav/Sidenav.css"
function EmployeeSidenav() {
  const navigate = useNavigate();
  const empId = localStorage.getItem("empId");

  const logout = (event) => {
    event.preventDefault();

    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="d-flex">
      <div
        className="nav bg-purple totalPage employeesidenav "
        id="sidebar"
        style={{ padding: "1rem" }}
      >
        <ul className="content list-unstyled">
          {/* <li className="content__item custom-link">
            <Link to="/" className="link link--iocaste  listdata p-3">
              <i className="bi bi-house-door"></i>
              <span>Home Details</span>
              <svg
                className="link__graphic link__graphic--slide"
                width="300%"
                height="100%"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
              >
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
              </svg>
            </Link>
          </li> */}

          <li className="content__item custom-link">
            <Link
              to="/EmployeeDashboard/createAttendence"
              className="link link--iocaste  listdata linkdata p-3 overflow-hidden "
            >
              <i className="bi bi-plus"></i>
              <span>Add Attendance</span>
              <svg
                className="link__graphic link__graphic--slide"
                width="300%"
                height="100%"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
              >
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
              </svg>
            </Link>
          </li>

          <li
            className="content__item custom-link"
            onClick={() => {
              navigate(`/EmployeeDashboard/ViewNotification/${empId}`);
            }}
          >
            <Link className="link link--iocaste  listdata linkdata p-3 overflow-hidden">
              <i className="bi bi-plus"></i>
              <span>View Notifications</span>
              <svg
                className="link__graphic link__graphic--slide"
                width="300%"
                height="100%"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
              >
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
              </svg>
            </Link>
          </li>

          <li className="content__item custom-link">
            <Link
              to="/EmployeeDashboard/LeaveApprovalForm"
              className="link link--iocaste  listdata linkdata p-3 overflow-hidden"
            >
              <i className="bi bi-plus"></i>
              <span>Apply For Leave</span>
              <svg
                className="link__graphic link__graphic--slide"
                width="300%"
                height="100%"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
              >
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
              </svg>
            </Link>
          </li>

          <li className="content__item custom-link">
            <Link
              to="/EmployeeDashboard/attendances"
              className="link link--iocaste  listdata linkdata p-3 overflow-hidden"
            >
              <i className="bi bi-view-list"></i>
              <span>Attendance Details</span>
              <svg
                className="link__graphic link__graphic--slide"
                width="300%"
                height="100%"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
              >
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
              </svg>
            </Link>
          </li>

          <li className="content__item custom-link">
            <Link
              to="/EmployeeDashboard/LeaveApprovalList"
              className="link link--iocaste  listdata p-3 linkdata overflow-hidden"
            >
              <i className="bi bi-view-list"></i>
              <span>Leaves Details</span>
              <svg
                className="link__graphic link__graphic--slide"
                width="300%"
                height="100%"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
              >
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
              </svg>
            </Link>
          </li>

          <li className="content__item logout-item custom-link">
            <Link
              onClick={logout}
              className="link link--iocaste linkdata  listdata p-3 overflow-hidden"
            >
              <i className="bi bi-box-arrow-left"></i>
              <span>Logout</span>
              <svg
                className="link__graphic link__graphic--slide"
                width="300%"
                height="100%"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
              >
                <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EmployeeSidenav;
