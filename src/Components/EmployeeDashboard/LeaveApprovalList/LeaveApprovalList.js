import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { getXsrfToken } from "../../../App.js";
import axiosInstance from "./../../../axiosInstance.js";

const LeaveApprovalList = () => {
  const [leaveApprovals, setLeaveApprovals] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const empId = sessionStorage.getItem("empId");
  const [hasNoData, setHasNoData] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const xsrfToken = getXsrfToken();

  useEffect(() => {
    fetchLeaveApprovals();
  }, [empId]);

  const fetchLeaveApprovals = async () => {
    setisLoading(true);

    try {
      const response = await  axiosInstance.get(`${apiUrl}employees/leave/${empId}`, {
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
        // "x-xsrf-token": xsrfToken,
        },
        withCredentials: true,
      }); // Adjust the endpoint URL as needed
      setLeaveApprovals(response.data.reverse());
      setHasNoData(response.data.length === 0);
      setisLoading(false);
    } catch (error) {
      setError("Error fetching leave approvals");
      //console.error("There was an error fetching the leave approvals:", error);
      //setisLoading(false);
    }
     finally {
      setisLoading(false);
    }
  };
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>{error}</p>;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveApprovals.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(leaveApprovals.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={`page-item ${number === currentPage ? "active" : ""}`}
      onClick={() => setCurrentPage(number)}
    >
      <a className="page-link" href="#!">
        {number}
      </a>
    </li>
  ));
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="w-[100%] ">
      {isLoading ? (
        // Spinner while loading
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : hasNoData ? (
        <div className="alert alert-warning text-center">No data found!</div>
      ) : (
        <div className="table-containerDetails table-container table-responsive text-center rounded shadow-sm bg-black-50">
          <h2 className="table-title text-light"> Leaves Data</h2>
          <table className="table-active table-striped table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Message</th>
                <th>Type</th>
                <th>Status</th>
                {/* <th>Employee ID</th> */}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((leave, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{leave.subject}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.message}</td>
                  <td>{leave.type}</td>
                  <td>{leave.status}</td>
                  {/* <td>{leave.employeeTable?.id}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <nav className="mt-2" aria-label="Page navigation example ">
        <ul className="pagination justify-content-center ">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePreviousPage}
          >
            <a className="page-link" href="#!">
              Previous
            </a>
          </li>
          <li className="page-item mt-2"> {renderPageNumbers}</li>
          <li
            className={`page-item ${
              currentPage === pageNumbers.length ? "disabled" : ""
            }`}
            onClick={handleNextPage}
          >
            <a className="page-link" href="#!">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeaveApprovalList;
