import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getXsrfToken } from "../../../App.js";
import axiosInstance from "./../../../axiosInstance.js";

import { useNavigate } from "react-router-dom";

function HolidayTableData() {
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState([]);
  const storedId = sessionStorage.getItem("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [hasNoData, setHasNoData] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  
  const xsrfToken = getXsrfToken();

  useEffect(() => {holiday(storedId)}, [storedId]);

  const holiday = async (storedId) => {
    setisLoading(true);
    try {
      const response = await axiosInstance.get(`${apiUrl}users/holiday/${storedId}`,
      {
        headers: {
          "Authorization": sessionStorage.getItem('Authorization')

        },
        observe: 'response',
        credentials: 'include',
           withCredentials: true,
       }

      );
      setJobDetails(response.data?.reverse());

      setHasNoData(response.data?.length === 0);
      setisLoading(false);

    } catch (error) {
      console.error("There was an error fetching the job details!", error.response?.data?.error);
      setisLoading(false);

    }
  };
  function handleEdit(jobId) {
    // console.log(jobId);
    navigate(`/hrdashboard/editHoliday/${jobId}`, {
      state: { jobDetails: jobDetails.find((job) => job.jobId === jobId) },
    });
  }

  function handleDelete(jobId) {
    // console.log("Deleting job with ID:", jobId);
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
        axiosInstance
          .delete(`${apiUrl}holidays/delete/${jobId}`,{
            headers:{
              user_Id: storedId,
          "Authorization": sessionStorage.getItem('Authorization'),
          //"x-xsrf-token":xsrfToken
            },
            observe: 'response',
            credentials: 'include',
               withCredentials: true,
          })
          .then(() => {
            setJobDetails(jobDetails.filter((job) => job.id !== jobId));
            Swal.fire("Deleted!", "Your job has been deleted.", "success");
            holiday(storedId);
          })
          .catch((error) => {
            console.error("There was an error deleting the job!", error);
            Swal.fire({
              
             title: error.response.data.error,
              text:error.response.data.message,
              icon:"error"
            });
          });
      } else {
        Swal.fire("Cancelled", "Your job is safe :)", "info");
      }
    });
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobDetails?.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobDetails?.length / itemsPerPage); i++) {
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
  // ml-[29%] w-[71%] md:ml-[33%] md:w-[67%] lg:ml-[28%] lg:w-[72%] xl:ml-[20%] xl:w-[80%]
  return (
    <div className="w-[100%] ">
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
        <div className="table-container table-responsive text-center rounded shadow-sm holidayTableDetails">
        <h2 className="table-title text-light">Holidays List Details</h2>
        <table className="table-active table-striped table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Holiday Name</th>
              <th>Holiday Description</th>
              <th>Date</th>
              <th>Holiday Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((job, index) => (
              <tr key={index}>
                <td>{index +indexOfFirstItem+ 1}</td>
                <td>{job.holidayTitle}</td>
                <td>{job.description}</td>
                <td>{job.holidayDate}</td>
                <td>{job.holidayType}</td>

                <td >
                  <span
                    onClick={() => handleEdit(job.holidayId)}
                    className="icon-container edit p-2"
                    title="Edit"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                  {/* <button onClick={() => handleDelete(job.id)}>Delete</button> */}
                  <span
                    onClick={() => handleDelete(job.holidayId)}
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
        <ul className="pagination justify-content-center ">
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

export default HolidayTableData;
