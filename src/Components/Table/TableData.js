import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getXsrfToken } from "../../App.js";

import { useNavigate } from "react-router-dom";

function TableData() {
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState([]);
  const storedId = localStorage.getItem("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [Isloading, SetIsLoading] = useState(false);
  const [hasNoData, setHasNoData] = useState(false);
  const xsrfToken = getXsrfToken();

  useEffect(() => {
    getAllJobDetails(storedId);
  }, [storedId]);

  const getAllJobDetails = async (storedId) => {
    SetIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}users/add-job-details/${storedId}`,
     {
      headers: {
        "Authorization": sessionStorage.getItem('Authorization'),
      
      },
      observe: 'response',
      credentials: 'include',
         withCredentials: true,
       
     }
      );
      setJobDetails(response.data.reverse());
      setHasNoData(response.data.length === 0);
      SetIsLoading(false);
    } catch (error) {
      console.error("There was an error fetching the job details!", error);
      SetIsLoading(false);
    }
  };

  function handleEdit(jobId) {
    // console.log(jobId);
    navigate(`/hrdashboard/editJobDetails/${jobId}`, {
      state: { jobDetails: jobDetails.find((job) => job.jobId === jobId) },
    });
  }

  function handleDelete(jobId) {
    if (jobId === undefined) {
      console.error("jobId is undefined!");
      return;
    }
  
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl}JobDetails/delete/${jobId}`, {
            headers: {
              "Content-Type": "application/json",
              "user_Id": storedId,
              "Authorization": sessionStorage.getItem('Authorization'),
              //"x-xsrf-token":xsrfToken
            },
    
               withCredentials: true,
          })
          .then((response) => {
            setJobDetails((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
            Swal.fire("Deleted!", "Your job has been deleted.", "success");
            getAllJobDetails(storedId);
          })
          .catch((error) => {
            console.error("Error deleting the job:", error);
            // Handle the error properly, logging it and displaying a user-friendly message
            Swal.fire({
              title: "Error",
              text: error.response?.data?.message || "An error occurred while deleting the job.",
              icon: "error",
            });
          });
      } else {
        Swal.fire("Cancelled", "Your job is safe :)", "info");
      }
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
  // ml-[30%] w-[70%] md:ml-[33%] md:w-[67%] lg:ml-[30%] lg:w-[70%] xl:ml-[20%] xl:w-[80%]
  return (
    <div className="w-[100%] totalPage">
      {Isloading ? (
        // Spinner while loading
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : hasNoData ? (
        <div className="alert alert-warning text-center">No data found!</div>
      ) : (
        <div className="table-container  table-responsive text-center rounded shadow-sm">
          <h2 className="table-title text-light">Job Details</h2>
          <table className="table-active table-striped table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Job Title</th>
                {/* <th>Key Skills</th> */}
                <th>Created At</th>
                <th>Years of Experience</th>
                <th>Overall_Percentage</th>
                <th>No_Of_Vacancies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((job, index) => (
                <tr key={index}>
                  <td>{index + indexOfFirstItem + 1} </td>
                  <td>{job.jobTitle}</td>
                  {/* <td>{job.jobkeyskills.join(", ")}</td> */}
                  <td>{job.createdAt}</td>
                  <td>{job.yearsOfExperience}</td>
                  <td>{job.overallPercentage}%</td>
                  <td>{job.noOfVacancies}</td>

                  <td>
                    <span
                      onClick={() => handleEdit(job.jobId)}
                      className="icon-container edit p-2"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                    {/* <button onClick={() => handleDelete(job.id)}>Delete</button> */}
                    <span
                      onClick={() => handleDelete(job.jobId)}
                      className="icon-container delete"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <nav className="mt-2" aria-label="Page navigation example ">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePreviousPage}
          >
            <a className="page-link" href="#!" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item mt-2"> {renderPageNumbers}</li>
          <li
            className={`page-item ${
              currentPage === pageNumbers.length ? "disabled" : ""
            }`}
            onClick={handleNextPage}
          >
            <a className="page-link" href="#!" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TableData;
