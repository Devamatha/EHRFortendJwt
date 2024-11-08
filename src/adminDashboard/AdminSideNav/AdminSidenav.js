import React from "react";
import { Link } from "react-router-dom";
import "./Adminsidenav.css";
import { useNavigate } from "react-router-dom";

function AdminSidenav() {
  const navigate = useNavigate();

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
        className="nav bg-purple totalPage adminsidenav "
        id="sidebar"
        style={{ padding: "1rem" }}
      >
        <ul className="content list-unstyled">
          {/* <li className="content__item custom-link">
          <Link to="/" className="link link--iocaste  listdetails ">
            <i className="bi bi-house-door"></i>
            <span>Home</span>
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
          <Link to="/" className="link link--iocaste  listdetails">
            <i className="bi bi-grid "></i>
            <span>Dashboard</span>

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
              to="/AdminDashboard/usersList"
              className="link link--iocaste  listdetails"
            >
              <i className="bi bi-view-list"></i>
              <span>Users List</span>

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
              to="/AdminDashboard/addPackage"
              className="link link--iocaste  listdetails"
            >
              <i className="bi bi-calendar-event"></i>

              <span>Add Package</span>
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
              to="/AdminDashboard/Home"
              className="link link--iocaste  listdetails"
            >
              <i className="bi bi-journal-plus"></i>
              <span>Packages List</span>

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
            <Link onClick={logout} className="link link--iocaste  listdetails">
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

export default AdminSidenav;
