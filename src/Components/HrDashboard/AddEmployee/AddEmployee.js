import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { getXsrfToken } from "../../../App.js";

function AddEmployee() {
  const storedId = localStorage.getItem("user_id");
  //const [file, setFile] = useState(null);
  const [fullName, setfullName] = useState("");
  const [dob, setDate] = useState("");
  const [gender, setgender] = useState("");
  const [maritalStatus, setmaritalStatus] = useState("");
  const [nationality, setnationality] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [email, setemailId] = useState("");
  const [identification, setidentification] = useState("");
  const [idNumber, setidNumber] = useState("");
  const [employeeType, setemployeeType] = useState("");
  const [joiningDate, setjoiningDate] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [mobileNumber, setcontactNo] = useState("");
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [state, setstate] = useState("");
  const [loading, setLoading] = useState(false);
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);

  // };

  const xsrfToken = getXsrfToken();

  const [error, setError] = useState("");
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > 1 * 1024 * 1024) {
  //       setError("File with maximum size of 1MB is allowed");
  //       return;
  //     }
  //     setError("");
  //     setFile(file.name);
  //   } else {
  //     setFile("");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      dob,
      gender,
      maritalStatus,
      nationality,
      address,
      city,
      state,
      country,
      email,
      mobileNumber,
      identification,
      idNumber,
      employeeType,
      joiningDate,
      bloodGroup,
      fullName,
    };
    try {
      // Step 1  Upload Resume
      const backendResponse = await axios.post(
        `${apiUrl}clients/save/Employee/${storedId}`,

        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            user_Id: storedId,
            Authorization: sessionStorage.getItem("Authorization"),
            "x-xsrf-token": xsrfToken,
          },

          withCredentials: true,
        }
      );

      
      Swal.fire({
        icon: "success",
        title: "Employee Details added successfully",
        text: "Employee Details added successfully.",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error details ", error);

      Swal.fire({
        icon: "error",
        title: error.response?.data?.error,
        text: error.response?.data?.message,
      });
      // setWebhookMessage('');
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid align-self-start align-self-md-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black-50 p-2 rounded shadow-sm "
      >
        <h5 className="text-light text-center">Add-Employee-Details</h5>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputfullName"
              className="col-sm-4 col-form-label text-light"
            >
              FullName
            </label>
            <input
              type="text"
              className="form-control"
              id="inputfullName"
              placeholder="fullName"
              required
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputdob"
              className="col-sm-4 col-form-label text-light"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="inputdob"
              placeholder="dob"
              required
              value={dob}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputgender"
              className="col-sm-4 col-form-label text-light"
            >
              Gender
            </label>
            <select
              className="form-control"
              id="inputgender"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputmaritalStatus"
              className="col-sm-4 col-form-label text-light"
            >
              MaritalStatus
            </label>

            <select
              className="form-control"
              id="inputmaritalStatus"
              value={maritalStatus}
              onChange={(e) => setmaritalStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Marital status
              </option>
              <option value="Single">Single</option>
              <option value="Cohabitation">Cohabitation</option>
              <option value="Married">Married</option>
              <option value="Registered Patnership">
                Registered Patnership
              </option>
              <option value="Have been Married before">
                Have been Married before
              </option>
              <option value="Window">widow</option>
            </select>
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputnationality"
              className="col-sm-4 col-form-label text-light"
            >
              Nationality
            </label>

            <input
              type="text"
              className="form-control"
              id="inputnationality"
              placeholder="nationality"
              required
              value={nationality}
              onChange={(e) => setnationality(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputaddress"
              className="col-sm-4 col-form-label text-light"
            >
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputaddress"
              placeholder="address"
              required
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputcity"
              className="col-sm-4 col-form-label text-light"
            >
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputcity"
              placeholder="city"
              value={city}
              required
              onChange={(e) => setcity(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputstate"
              className="col-sm-4 col-form-label text-light"
            >
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="inputstate"
              placeholder="state"
              value={state}
              required
              onChange={(e) => setstate(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputcountry"
              className="col-sm-4 col-form-label text-light"
            >
              Country
            </label>

            <input
              type="text"
              className="form-control"
              id="inputcountry"
              required
              placeholder="country"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputemailId"
              className="col-sm-4 col-form-label text-light"
            >
              EmailId
            </label>
            <input
              type="text"
              className="form-control"
              id="inputemailId"
              placeholder="emailId"
              required
              value={email}
              onChange={(e) => setemailId(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputcontactNo"
              className="col-sm-4 col-form-label text-light"
            >
              ContactNo
            </label>
            <input
              type="text"
              className="form-control"
              id="inputcontactNo"
              placeholder="contactNo"
              required
              value={mobileNumber}
              onChange={(e) => setcontactNo(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputidentification"
              className="col-sm-4 col-form-label text-light"
            >
              Identification
            </label>
            <select
              className="form-control"
              id="inputidentification"
              value={identification}
              required
              onChange={(e) => setidentification(e.target.value)}
            >
              <option value="" disabled>
                Select Identification
              </option>
              <option value="voterId">Voter Id</option>
              <option value="AadharId">Aadhar card</option>
              <option value="Driving License">Driving License</option>
              <option value="Passport">Passport</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputidNumber"
              className="col-sm-4 col-form-label text-light"
            >
              IdNumber
            </label>
            <input
              type="text"
              className="form-control"
              id="inputidNumber"
              placeholder="idNumber"
              required
              value={idNumber}
              onChange={(e) => setidNumber(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputjoiningDate"
              className="col-sm-4 col-form-label text-light"
            >
              JoiningDate
            </label>
            <input
              type="date"
              className="form-control"
              id="inputjoiningDate"
              placeholder="joiningDate"
              value={joiningDate}
              required
              onChange={(e) => setjoiningDate(e.target.value)}
            />
          </div>
          <div className="col-12  col-md-4 col-lg-4 mt-1">
            <label
              htmlFor="inputbloodGroup"
              className="col-sm-4 col-form-label text-light"
            >
              BloodGroup
            </label>
            <input
              type="text"
              className="form-control"
              id="inputbloodGroup"
              placeholder="bloodGroup"
              value={bloodGroup}
              required
              onChange={(e) => setbloodGroup(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12  col-md-6 col-lg-4 mt-1">
            <label
              htmlFor="inputemployeeType"
              className="col-sm-4 col-form-label text-light"
            >
              EmployeeType
            </label>
            {/* <input
              type="text"
              className="form-control"
              id="inputemployeeType"
              placeholder="employeeType"
              value={employeeType}
              required
              onChange={(e) => setemployeeType(e.target.value)}
            /> */}

            <select
              className="form-control"
              id="inputemployeeType"
              value={employeeType}
              required
              onChange={(e) => setemployeeType(e.target.value)}
            >
              <option value="" disabled>
                Select EmployeeType
              </option>
              <option value="FullTime">FullTime</option>
              <option value="Contractor">Contractor</option>
              <option value="PartTime">PartTime</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
          {/* <div className="col-12 col-md-6 col-lg-4  mt-1">
            <label
              htmlFor="file"
              className="col-sm-4 col-form-label text-light"
            >
              image
            </label>
            <input
              type="file"
              id="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              className="form-control"
              required
            />

            {error && <p className="text-red-500 mt-1">{error}</p>}
          </div> */}
        </div>

        <button
          type="submit"
          className="btn  btn-block button mt-2"
          disabled={loading}
        >
          {loading ? (
            <span>
              <i className="spinner-border spinner-border-sm" role="status"></i>
              adding...
            </span>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
