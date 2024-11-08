import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
function LeaveApprovalData() {
  const [leaveDetails, setLeaveDetails] = useState([]);
  const storedId = localStorage.getItem("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [hasNoData, setHasNoData] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    leaveApprovalData(storedId);
  }, [storedId]);

  const leaveApprovalData = async (storedId) => {
    const response = await axios
      .get(`${apiUrl}users/leave-approvals/${storedId}`)
      .then((response) => {
        const allLeaveApprovals = response.data.reverse();
        setLeaveDetails(allLeaveApprovals);
        setHasNoData(response.data.length === 0);
        setisLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the leave approval details!",
          error
        );
        setisLoading(false);
      });
  };

  const updateStatus = (newStatus, id) => {
    const formData = new FormData();
    formData.append("status", newStatus);
    axios
      .put(`${apiUrl}leaveApproval/status/${id}`, formData, {
        headers: {
          user_Id: storedId,
        },
      })
      .then((response) => {
        //alert(`Status updated to ${newStatus}`);
        Swal.fire({
          title: "Success!",
          text: `Status updated to ${newStatus}`,
          icon: "success",
        });
        // console.log(response, "response");
      })
      .catch((error) => {
        console.error("There was an error updating the status!", error);
        // alert("Could not update status. The start date might be in the past.");
        Swal.fire({
          title: error.response?.data?.error,
              text: error.response?.data?.message,
              icon: 'error',
              confirmButtonText: 'OK'
        })
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveDetails.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(leaveDetails.length / itemsPerPage); i++) {
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
        <div className="table-container LeaveApprovalTabl table-responsive text-center rounded shadow-sm">
          <h2 className="table-title text-light">
            LeaveApproval Details Of All the Employees
          </h2>
          <table className="table-active table-striped table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Subject</th>
                <th> dates</th>
                <th>message</th>
                <th>type</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((leaveApproval, index) => (
                <tr key={index}>
                  <td>{index + indexOfFirstItem + 1}</td>
                  <td>{leaveApproval.fullName}</td>

                  <td>{leaveApproval.subject}</td>
                  <td>
                    {leaveApproval.startDate}-{leaveApproval.endDate}
                  </td>
                  <td>{leaveApproval.message}</td>
                  <td>{leaveApproval.type}</td>
                  <td>{leaveApproval.status}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => updateStatus("approved", leaveApproval.id)}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} /> Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => updateStatus("rejected", leaveApproval.id)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} /> Reject
                    </button>
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

export default LeaveApprovalData;
