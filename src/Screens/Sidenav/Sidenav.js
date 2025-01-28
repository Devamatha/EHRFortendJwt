import React from "react";
import { Link } from "react-router-dom";
import "./Sidenav.css";
import { useNavigate } from "react-router-dom";

function Sidenav() {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();

    try {
      sessionStorage.clear();
      sessionStorage.clear();
     
    } catch {
    } finally {
      navigate("/Login", { replace: true });
    }
  };

  return (
    <div
      className="nav bg-purple totalPage allsidenav"
      id="sidebar"
      style={{ padding: "1rem" }}
    >
      <ul className="content list-unstyled">
        {/* <li className="content__item custom-link">
            <Link to="/" className="link link--iocaste linkdata ">
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
          </li> */}

        <li className="content__item custom-link">
          <Link
            to="/hrdashboard/addJobDetails"
            className="link link--iocaste linkdata  p-3"
          >
            <i className="bi bi-plus"></i>
            <span>Add Job Details</span>

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
            to="/hrdashboard/listJobDetails"
            className="link link--iocaste linkdata  p-3"
          >
            {/* <i className="bi bi-calendar-event"></i> */}
            <i className="bi bi-eye"></i>
            <span>Job Details List</span>
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
            to="/hrdashboard/resumeUpload"
            className="link link--iocaste linkdata  p-3"
          >
            <i className="bi bi-upload"></i>
            <span>Upload Resume</span>

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
            to="/hrdashboard/AddHoliday"
            className="link link--iocaste linkdata  p-3"
          >
            <i className="bi bi-plus"></i>
            <span>Add Holiday</span>

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
            to="/hrdashboard/HolidayTableData"
            className="link link--iocaste linkdata  p-3"
          >
            {/* <i className="bi bi-calendar-event"></i> */}
            <i className="bi bi-eye"></i> <span>Holiday List</span>
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
            to="/hrdashboard/AddEmployee"
            className="link link--iocaste linkdata  p-3"
          >
            <i className="bi bi-plus"></i>
            <span>Add Employee</span>

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
            to="/hrdashboard/EmployeeList"
            className="link link--iocaste linkdata  p-3"
          >
            {/* <i className="bi bi-calendar-event"></i> */}
            <i className="bi bi-eye"></i>
            <span>Employee List</span>
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
            to="/hrdashboard/AddPayHead"
            className="link link--iocaste linkdata  p-3"
          >
            <i className="bi bi-plus"></i>
            <span>Add Pay Head</span>

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
            to="/hrdashboard/PayHeadList"
            className="link link--iocaste linkdata  p-3"
          >
            {/* <i className="bi bi-calendar-event"></i> */}
            <i className="bi bi-eye"></i>
            <span>Pay Head List</span>
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
            to="/hrdashboard/AttedenceEmployee"
            className="link link--iocaste linkdata  p-3"
          >
            {/* <i className="bi bi-calendar-event"></i> */}
            <i className="bi bi-eye"></i>
            <span>EmployeeAttedence</span>
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
            to="/hrdashboard/LeaveApproval"
            className="link link--iocaste linkdata p-3"
          >
            {/* <i className="bi bi-calendar-event"></i> */}
            <i className="bi bi-view-list"></i>
            <span>LeaveApproval</span>
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
            to="/hrdashboard/PersonalInformationTable"
            className="link link--iocaste linkdata p-3"
          >
            <i className="bi bi-eye "></i>
            <span>Candidates View</span>

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
            to="/hrdashboard/UpgradePlan"
            className="link link--iocaste linkdata p-3"
          >
            <i className="bi bi-eye "></i>
            <span>Upgrade Plan</span>

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
          <Link onClick={logout} className="link link--iocaste linkdata p-3">
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
  );
}

export default Sidenav;
