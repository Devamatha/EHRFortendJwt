import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

// import "./LeaveApproval.css"
const LeaveApproval = () => {
  // Retrieve the employee ID from localStorage
  const empId = localStorage.getItem("empId");
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  // State hooks for form fields
  const [subject, setSubject] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    const leaveApprovalData = {
      subject,
      startDate,
      endDate,
      message,
      type,
      status,
    };

    try {
      // Post request to backend API
      const response = await axios.post(
        `${apiUrl}leaveApproval/employee/${empId}`,
        leaveApprovalData,
        {
          headers: {
            Id: empId,
          },
        }
      );
      // console.log('Leave approval created:', response.data);

      // Optionally reset form fields or show success message
      setSubject("");
      setStartDate("");
      setEndDate("");
      setMessage("");
      setType("");
      setStatus("Pending");
      setLoading(false);
      Swal.fire({
        title: "Leave approval request submitted successfully",
        text: "Leave approval request submitted successfully",
        icon: "success",
      });
      setLoading(false);

      // alert("Leave approval request submitted successfully!");
    } catch (error) {
      console.error("There was an error creating the leave approval:", error);
      // alert("Failed to submit leave approval request.");

      setSubject("");
      setStartDate("");
      setEndDate("");
      setMessage("");
      setType("");
      Swal.fire({
        title: error.response.data.error,
        text: error.response.data.message,
        icon: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="container-fluid   leaveApproval ">
        <form
          onSubmit={handleSubmit}
          className="bg-black-50 p-3 rounded shadow-sm form-width"
        >
          <h4 className="text-light text-center">Apply Leave</h4>

          <div className="form-group row formdiv">
            <label
              htmlFor="subject"
              className="col-sm-4 col-form-label text-light"
            >
              Subject
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group row formdiv">
            <label
              htmlFor="startdate"
              className="col-sm-4 col-form-label text-light"
            >
              Start Date
            </label>
            <div className="col-sm-8">
              <input
                type="date"
                className="form-control"
                id="startdate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group row formdiv">
            <label
              htmlFor="enddate"
              className="col-sm-4 col-form-label text-light"
            >
              End Date
            </label>
            <div className="col-sm-8">
              <input
                type="date"
                className="form-control"
                id="enddate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group row formdiv">
            <label
              htmlFor="message"
              className="col-sm-4 col-form-label text-light"
            >
              Message
            </label>
            <div className="col-sm-8">
              <textarea
                className="form-control"
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group row formdiv">
            <label
              htmlFor="type"
              className="col-sm-4 col-form-label text-light"
            >
              Type
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="type"
                placeholder="Enter type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group row mt-4">
            <div className="col-sm-12 text-center">
              <button
                type="submit"
                className="btn button w-100"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <i
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></i>{" "}
                    submitting...
                  </span>
                ) : (
                  "submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApproval;
