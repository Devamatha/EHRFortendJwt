import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"
import axiosInstance from "./../../../axiosInstance.js";

function AttedenceEmployee() {
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const storedId = sessionStorage.getItem("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [hasNoData, setHasNoData] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);

    axiosInstance
      .get(`${apiUrl}users/attendance/${storedId}`,
        {
          headers: {
            "Authorization": sessionStorage.getItem('Authorization')
           
          },
          observe: 'response',
          credentials: 'include',
             withCredentials: true,
        }
      )
      .then((response) => {
       
        setAttendanceDetails(response.data.reverse());
        setHasNoData(response.data.length === 0);
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);
Swal.fire({
  title: "Error",
  text: error.message,
  icon: "error",
  confirmButtonText: "OK",

})
        console.error("There was an error fetching the attendance details!", error);
      });
  }, [storedId]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceDetails.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(attendanceDetails.length / itemsPerPage); i++) {
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
    <div className="w-[100%]">
         {isLoading ? (
        // Spinner while loading
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) :hasNoData?(
        <div className="alert alert-warning text-center">No data found!</div>
 
      ):(
      <div className="table-container attedenceTable table-responsive text-center rounded shadow-sm">
        <h2 className="table-title text-light">
          Attendance Details Of All the Employees
        </h2>
        <table className="table-active table-striped table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Punch In Message</th>
              <th>Punch Out Message</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((attendance, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{attendance.name}</td>
                <td>{attendance.date}</td>
                <td>{attendance.punchIn}</td>
                <td>{attendance.punchOut}</td>
                <td>{attendance.punchInMessage}</td>
                <td>{attendance.punchOutMessage}</td>
                <td>{attendance.workingHours}</td>
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
}

export default AttedenceEmployee;
