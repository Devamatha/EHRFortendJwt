import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import{getXsrfToken} from "../../../App.js";
import axiosInstance from "./../../../axiosInstance.js";

const AttendanceForm = () => {
  const empId = sessionStorage.getItem("empId");

  const [date, setDate] = useState("");
  const [punchOutMessage, setPunchOutMessage] = useState("");
  const [punchOut, setPunchOut] = useState("");
  const [punchIn, setPunchIn] = useState("");
  const [punchInMessage, setPunchInMessage] = useState("");
  const [isPunchInSelected, setIsPunchInSelected] = useState(true);
  const [attendanceData, setAttendanceData] = useState(null);
  //const [name, setName] = useState("");
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [loading, setLoading] = useState(false);
const xsrfToken = getXsrfToken();
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);

    const fetchAttendance = async () => {
      try {
        const response = await axiosInstance.get(
          `${apiUrl}attendance/employee/attendance/${empId}/${currentDate}`,
          {
            headers:{
              "Authorization": sessionStorage.getItem("Authorization"),

            },
            withCredentials: true
          }
        );
        const data = response.data;
        if (data) {
          setAttendanceData(data);
          setIsPunchInSelected(!data.attendance);
          if (data.attendance) {
            setPunchIn(data.punchIn);
            setPunchInMessage(data.punchInMessage);
          }
         
        }
      } catch (error) {
        console.error("Error fetching attendance data", error);
        Swal.fire({
          title: error.response.data.error,
          text: error.response.data.message,
          icon: "error",
        });
      
      }
    };

    fetchAttendance();
  }, [empId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("date", date);
    formData.append("punchInMessage", punchInMessage);
    formData.append("punchIn", punchIn);
    try {
      const response = await axiosInstance.post(`${apiUrl}attendance/employee/${empId}`, formData,{
      
        headers: {
          
          "Id": empId,
          "Authorization": sessionStorage.getItem('Authorization'),
         // "x-xsrf-token": xsrfToken
        },
      
        withCredentials: true
      });
      setLoading(false);
        Swal.fire({
          title: "Punch In added successfully",
          text: "Punch In added successfully",
          icon: "success",
        });
    
      setPunchInMessage("");
      setPunchIn("");
      setDate("");
    } catch (error) {
      setLoading(false);
      console.error("Error submitting attendance", error);
      Swal.fire({
        title: error.response?.data?.error,
        text: error.response?.data?.message,
        icon: "error",
      });
      setPunchInMessage("");
      setPunchIn("");
      setDate("");
    }
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!attendanceData) {
        console.error("No attendance data available");
        return;
      }
      const formData = new FormData();
      formData.append("punchIn",attendanceData.punchIn);
      formData.append("punchOut",punchOut);
      formData.append("punchInMessage",attendanceData.punchInMessage);
      formData.append("punchOutMessage",punchOutMessage);
      formData.append("date",attendanceData.date);
      formData.append("name",attendanceData.name);
      const response = await axiosInstance.put(`${apiUrl}attendance/update/${attendanceData.id}`,formData, {
      
        headers: {
          //"Content-Type": "application/json",
          "Id": empId,
          "Authorization": sessionStorage.getItem('Authorization'),
         // "x-xsrf-token": xsrfToken
        },
        withCredentials: true
      });
      setLoading(false);
      setPunchOut("");
      setPunchOutMessage("");
        Swal.fire({
          title: "Punch Out added successfully",
          text: "Punch Out added successfully",
          icon: "success",
        });
      
         } catch (error) {
      setLoading(false);

      Swal.fire({
        title: error.respose?.data?.error,
        text: error.response?.data?.message,
        icon: "warning",
      });
      setPunchOut("");
      setPunchOutMessage("");
      setDate("");

    }
  };

  return (
    <div className="">
      <div className="container-fluid   createAttedence">
        <form className="bg-black-50 p-4 rounded shadow-sm form-width">
          <h5 className="text-light text-center">Attendence</h5>
          <div className="form-group row mt-2">
            <label
              htmlFor="date"
              className="col-sm-5 col-md-5  col-form-label text-light"
            >
              Date
            </label>
            <div className="col-sm-7  col-md-7 ">
              <input
                type="date"
                className="form-control"
                id="date"
                disabled
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          {isPunchInSelected && (
            <>
              <div className="form-group row mt-2">
                <label
                  htmlFor="punchIn"
                  className="col-sm-5 col-md-5  col-form-label text-light"
                >
                  Punch In
                </label>
                <div className="col-sm-7  col-md-7 ">
                  <input
                    type="time"
                    className="form-control"
                    id="punchIn"
                    value={punchIn}
                    onChange={(e) => setPunchIn(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group row mt-2">
                <label
                  htmlFor="punchInMessage"
                  className="col-sm-5 col-md-5  col-form-label text-light"
                >
                  Punch In Message
                </label>
                <div className="col-sm-7  col-md-7 ">
                  <input
                    type="text"
                    className="form-control"
                    id="punchInMessage"
                    value={punchInMessage}
                    onChange={(e) => setPunchInMessage(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group row mt-4">
                <div className="col-sm-12 text-center">
                  <button
                    type="submit"
                    className="btn button w-100"
                    onClick={handleSubmit}
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
                      "Login"
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {!isPunchInSelected && (
            <>
              <div className="mb-3">
                <label htmlFor="punchOut" className="form-label">
                  Punch Out
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="punchOut"
                  value={punchOut}
                  onChange={(e) => setPunchOut(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="punchOutMessage" className="form-label">
                  Punch Out Message
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="punchOutMessage"
                  value={punchOutMessage}
                  onChange={(e) => setPunchOutMessage(e.target.value)}
                />
              </div>
              <div className="form-group row mt-4">
                <div className="col-sm-12 text-center">
                  <button
                    type="submit"
                    className="btn button w-100"
                    onClick={handleUpdateDetails}
                    disabled={loading}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AttendanceForm;
