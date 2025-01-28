import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "./../axiosInstance";

// import "./PersonalInformationTable.css";
function PersonalInformationTable() {
  const [jobDetails, setJobDetails] = useState([]);
  const storedId = sessionStorage.getItem("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const apiUrl=process.env.REACT_APP_DB;
const environment = process.env.REACT_APP_NODE_ENV;
const [hasNoData, setHasNoData] = useState(false);
const [isLoading, setisLoading] = useState(false);

useEffect(() => {
  getDetailas(storedId)
  }, [storedId]);

  const getDetailas=async (storedId) => {
    setisLoading(true);

    axiosInstance
      .get(`${apiUrl}users/personalInformation/${storedId}`
        ,
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
        setJobDetails(response.data.reverse());
        setHasNoData(response.data.length === 0);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
        setisLoading(false);

      });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobDetails.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobDetails.length / itemsPerPage); i++) {
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
      <div className="table-container personaldata table-responsive text-center rounded shadow-sm">
        <h2 className="table-title text-light">Candidates Information</h2>
        <table className="table-active table-striped table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Candidate Name</th>
              <th>Candidate Email</th>
              <th>Candidate MobileNumber</th>
              <th>Candidate ExamID</th>
              <th>Interview Date</th>
              <th>Interview Time</th>
              <th>job Role</th>
              <th>Result</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((job, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{job.name}</td>
                <td>{job.emailID}</td>
                <td>{job.mobileNumber}</td>
                <td>{job.examId}</td>
                <td>{job.interviewDate}</td>
                <td>{job.interviewTime}</td>
                <td>{job.jobRole}</td>
                <td>{job.result}%</td>
                <td>{job.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
   
      </div>
      )}
 <div>
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
    </div>
  );
}

export default PersonalInformationTable;
