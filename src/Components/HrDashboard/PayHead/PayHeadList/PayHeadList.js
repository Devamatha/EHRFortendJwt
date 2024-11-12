import React from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getXsrfToken } from "../../../../App.js";

// import "./PayHeadList.css"
function PayHeadList() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [jobDetails, setJobDetails] = useState([]);
  const storedId = localStorage.getItem("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [hasNoData, setHasNoData] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const xsrfToken = getXsrfToken();

  useEffect(() => {
    payHeadList(storedId);
  }, [storedId]);

  const payHeadList = async (storedId) => {
    setisLoading(true);

    axios
      .get(`${apiUrl}users/payHeads/${storedId}`, {
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
        },

        withCredentials: true,
      })
      .then((response) => {
        setJobDetails(response.data.reverse());
        setHasNoData(response.data.length === 0);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
        setisLoading(false);
      });
  };
  function handleEdit(jobId) {
    // Navigate to the edit page with the job ID
    // console.log(jobId);
    navigate(`/hrdashboard/editPayHead/${jobId}`, {
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
        // Proceed with the deletion if confirmed
        axios
          .delete(`${apiUrl}payHeads/delete/${jobId}`, {
            headers: {
              user_Id: storedId,
              "Authorization": sessionStorage.getItem('Authorization'),
              "x-xsrf-token":xsrfToken
            },
            withCredentials: true,
          })
          .then(() => {
            setJobDetails(jobDetails.filter((job) => job.id !== jobId));
            Swal.fire("Deleted!", "Your Pay head has been deleted.", "success");
            payHeadList(storedId);
          })
          .catch((error) => {
            console.error("There was an error deleting the job!", error);
            Swal.fire({
              title: error.response?.data?.error,
              text: error.response?.data?.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      } else {
        // Optionally handle the case where the user cancels
        Swal.fire("Cancelled", "Your Pay Head is safe :)", "info");
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
  return (
    <div className="w-[100%]">
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
        <div className="table-container payheadListTableData   table-responsive text-center rounded shadow-sm ">
          <h2 className="table-title text-light">PayHead List Details</h2>
          <table className="table-active table-striped table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>PayHead Name</th>
                <th>Pay Head Description</th>
                <th>PayHead Type</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((job, index) => (
                <tr key={index}>
                  <td>{index + indexOfFirstItem + 1}</td>
                  <td>{job.payHeadName}</td>
                  <td>{job.payHeadDescription}</td>
                  <td>{job.payHeadType}</td>

                  <td>
                    <span
                      onClick={() => handleEdit(job.payHeadId)}
                      className="icon-container edit p-2"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                    {/* <button onClick={() => handleDelete(job.id)}>Delete</button> */}
                    <span
                      onClick={() => handleDelete(job.payHeadId)}
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

export default PayHeadList;
