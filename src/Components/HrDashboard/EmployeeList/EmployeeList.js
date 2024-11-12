import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faDollar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getXsrfToken } from "../../../App.js";
import { useNavigate } from "react-router-dom";
import PayheadsModal from "./PayHeadsModal/PayheadsModal";
import PaySlip from "./PaySlip/PaySlip";
// import "./EmployeeList.css";
function EmployeeList() {
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const handleOpenModal = (empId) => {
    setSelectedEmpId(empId);
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jobDetails, setJobDetails] = useState([]);
  const storedId = localStorage.getItem("user_id");
  const [isPaySlipOpen, setIsPaySlip] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [hasNoData, setHasNoData] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const xsrfToken = getXsrfToken();

  useEffect(() => {
    employeeList(storedId);
  }, []);
  const employeeList=async (storedId)=>{
    setisLoading(true);

    axios
    .get(`${apiUrl}users/employeedetails/${storedId}`,
      {
        headers: {
          "Authorization": sessionStorage.getItem('Authorization')
        },
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
  function handleEdit(jobId) {
    // console.log(jobId);
    navigate(`/hrdashboard/EditEmployee/${jobId}`, {
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
          .delete(`${apiUrl}employees/delete/${jobId}`,{
            headers:{
              user_Id: storedId,
              "Authorization": sessionStorage.getItem('Authorization'),
              "X-XSRF-TOKEN":xsrfToken
            },
            observe: 'response',
            credentials: 'include',
            withCredentials: true,
          })
          .then(() => {
            setJobDetails(jobDetails.filter((job) => job.id !== jobId));
            Swal.fire("Deleted!", "Your job has been deleted.", "success");
          })
          .catch((error) => {
            console.error("There was an error deleting the job!", error);
            Swal.fire({
              title: error.response?.data?.error,
              text: error.response?.data?.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });

          });
          employeeList(storedId);
      } else {
        // Optionally handle the case where the user cancels
        Swal.fire("Cancelled", "Your job is safe :)", "info");
      }
    });
  }

  const handleOpenPaySlipModal = (empId) => {
    setSelectedEmpId(empId);
    setIsPaySlip(true);
  };
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
        <div className="table-container table-responsive text-center rounded shadow-sm">
          <h2 className="table-title text-light">Employee Details Details</h2>
          <table className="table-active table-striped table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>EmailID</th>
                <th>ContactNumber</th>
                <th>Employee Code</th>
                <th>DateOfBirth</th>
                <th>Gender</th>
                <th>MaritalStatus</th>
                <th>Nationality</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
              
                <th>Identification</th>
                <th>IDNumber</th>
                <th>EmployeeType</th>
                <th>JoiningDate</th>
                <th>BloodGroup</th>
                {/* <th>Password</th> */}
                <th>Role</th>
                <th>Designation</th>
                <th>Department</th>
                <th>PANNo</th>
                <th>BankName</th>
                <th>BankAccount No</th>
                <th>IFSCCode</th>
                <th>PFAccountNo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((job, index) => (
                <tr key={index}>
                  <td>{index +indexOfFirstItem+ 1}</td>
                  <td>{job.fullName}</td>
                  <td>{job.emailId}</td>
                  <td>{job.contactNo}</td>
                  <td>{job.empCode}</td>
                  <td>{job.dob}</td>
                  <td>{job.gender}</td>
                  <td>{job.maritalStatus}</td>
                  <td>{job.nationality}</td>
                  <td>{job.address}</td>
                  <td>{job.city}</td>
                  <td>{job.state}</td>
                  <td>{job.country}</td>
                  <td>{job.identification}</td>
                  <td>{job.idNumber}</td>
                  <td>{job.employeeType}</td>
                  <td>{job.joiningDate}</td>
                  <td>{job.bloodGroup}</td>
                  {/* <td>{job.password}</td> */}
                  <td>{job.role}</td>
                  <td>{job.department}</td>
                  <td>{job.designation}</td>
                  <td>{job.panNo}</td>
                  <td>{job.bankName}</td>
                  <td>{job.bankAccountNo}</td>
                  <td>{job.ifsccode}</td>
                  <td>{job.pfAccountNo}</td>

                  <td>
                    <span
                      onClick={() => handleEdit(job.id)}
                      className="icon-container edit p-2"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                    <span
                      onClick={() => handleDelete(job.id)}
                      className="icon-container delete"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    <span
                      onClick={() => handleOpenModal(job.id)}
                      className="icon-container delete p-2"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </span>

                    <span onClick={() => handleOpenPaySlipModal(job.id)}>
                      <FontAwesomeIcon icon={faDollar} />
                    </span>

                    <PayheadsModal
                      show={isModalOpen}
                      empId={selectedEmpId}
                      closeModal={() => setIsModalOpen(false)}
                    />

                    <PaySlip
                      show={isPaySlipOpen}
                      empId={selectedEmpId}
                      closeModal={() => setIsPaySlip(false)}
                    />
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
export default EmployeeList;
