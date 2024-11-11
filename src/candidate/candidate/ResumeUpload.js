import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const ResumeUpload = () => {
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;

  const storedId = localStorage.getItem("user_id");
  const [formVisible, setFormVisible] = useState(false);

  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [trueKeys, setTrueKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resumeText, setresumeText] = useState(false);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Step 1: Upload Resume
      const backendResponse = await fetch(
        `${apiUrl}candidates/upload-resume/${storedId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            user_Id: storedId,
            "Authorization": sessionStorage.getItem("Authorization"),
            "x-xsrf-token": sessionStorage.getItem("XSRF-TOKEN"),
          },
          observe: "response",
          credentials: "include",
          withCredentials: true,
        }
      );

      if (backendResponse.ok) {
        const errorData = await backendResponse.json();
        console.log(errorData.jobRole);

        if (
          errorData.jobRole != null &&
          errorData.resumeTextData != null &&
          errorData != null
        ) {
          try {
            const webhookFormData = new FormData();
            webhookFormData.append("jobRole", errorData.jobRole);
            webhookFormData.append("resumeTextData", errorData.resumeTextData);
            // webhookFormData.append('startTime',fromTime);
            // webhookFormData.append('endime',toTime);
            // webhookFormData.append('timestamp', new Date().toISOString());

            const webhookResponse = await axios.post(
              "https://hook.eu2.make.com/6srs49d44nt3qxfkw9jwo4kq2c8h89q9",
              webhookFormData,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const jsonResponse = JSON.stringify(webhookResponse.data);

            const responseObject = JSON.parse(jsonResponse);
            const openPositions = responseObject["Open Positions"][0];
            const keysWithTrueValues = [];
            const keysWithFalseValues = [];
            for (const [key, value] of Object.entries(openPositions)) {
              if (value === true || value === "true") {
                keysWithTrueValues.push(key);
              } else {
                keysWithFalseValues.push(key);
              }
            }

            if (keysWithTrueValues.length > 0) {
              setTrueKeys(keysWithTrueValues);
              setFormVisible(true);
            } else {
              setFormVisible(false);
              Swal.fire({
                title:
                  "Resume is not matched with job roles: " +
                  keysWithFalseValues.join(", "),
                text: "Try with another resume",
                icon: "info",
              });
            }
          } catch (error) {
            console.error(error + "error response");
            setFile("");
          }
          setLoading(false);
        }
        setLoading(false);
      } else {
        const errorData = await backendResponse.json();
        Swal.fire({
          icon: "error",
          title: errorData.error,
          text: errorData.message,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log("hlooo");
      setLoading(false);

      setFile("");
      Swal.fire({
        icon: "warning",
        title: error.error,
        text: error.message,
      });
      //setWebhookMessage('');
    }
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setresumeText(true);
    const formData = new FormData();
    // formData.append("file", file);
    formData.append("date", date);
    formData.append("fromTime", fromTime);
    formData.append("jobRole", jobRole);

    try {
      // Step 1: Upload Resume
      const backendResponse = await fetch(
        `${apiUrl}candidates/update-Details/${storedId}`,

        {
          method: "PUT",
          body: formData,
          headers: {
            user_Id: storedId,
            "Authorization": sessionStorage.getItem("Authorization"),
            "x-xsrf-token": sessionStorage.getItem("XSRF-TOKEN"),
          },
          observe: "response",
          credentials: "include",
          withCredentials: true,
        }
      );
      if (backendResponse.ok) {
        Swal.fire({
          icon: "success",
          title: "Send the exam details to Candidate",
          text: "Send the exam details to Candidate",
        });
      } else {
        const errorData = await backendResponse.json();
        Swal.fire({
          icon: "error",
          title: errorData.error,
          text: errorData.message,
        });
      }

      setFormVisible(false);
      setresumeText(false);
      setDate("");
      setFromTime("");
      setJobRole("");
    } catch (error) {
      setresumeText(false);
      setDate("");
      setFromTime("");
      setJobRole("");
      setFormVisible(false);

      Swal.fire({
        icon: "error",
        title: error.error,
        text: error.message,
      });
      // setWebhookMessage('');
      console.error("Error details:", error);
    }
  };
  return (
    <div className="">
      <div className="container-fluid resumeUploadForm ">
        {!formVisible && (
          <form
            onSubmit={handleSubmit}
            className="bg-black-50 p-4 rounded shadow-sm form-width"
          >
            <h5 className="text-light text-center">Upload Resume</h5>

            <div className="form-group row mt-2">
              <label
                htmlFor="file"
                className="col-sm-4 col-form-label text-light"
              >
                Resume File:
              </label>
              <input
                type="file"
                id="file"
                accept=".pdf, .doc, .docx"
                onChange={handleFileChange}
                className="form-control"
                required
              />
            </div>

            <button
              type="submit"
              className="btn  btn-block button"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <i
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></i>
                  uploading...
                </span>
              ) : (
                " Upload "
              )}
            </button>
          </form>
        )}
        {formVisible && (
          <form
            onSubmit={handleSubmitDetails}
            className="bg-black-50 p-4 rounded shadow-sm form-width"
          >
            <div className="form-group row mt-2">
              <label
                htmlFor="date"
                className="col-sm-4 col-form-label text-light"
              >
                {" "}
                Interview Date:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group row mt-2">
              <label
                htmlFor="fromTime"
                className="col-sm-4 col-form-label text-light"
              >
                Interview Time:
              </label>
              <input
                type="time"
                id="fromTime"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                className="form-control"
                required
              />
            </div>

            {
              <div className="form-group row mt-2">
                <label
                  htmlFor="trueKeysDropdown"
                  className="col-sm-4 col-form-label text-light"
                >
                  Select a Job title:
                </label>
                <select
                  id="trueKeysDropdown"
                  className="form-control"
                  onChange={(e) => setJobRole(e.target.value)}
                  required
                >
                  <option value="">Select a key...</option>
                  {trueKeys.map((key, index) => (
                    <option key={index} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            }

            <button
              type="submit"
              className="btn button btn-block"
              disabled={resumeText}
            >
              {resumeText ? (
                <span>
                  <i
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></i>{" "}
                  sending...
                </span>
              ) : (
                "Send"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
