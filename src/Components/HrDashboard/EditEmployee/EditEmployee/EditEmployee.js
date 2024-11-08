import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [loading, setLoading] = useState(false);
  const user_Id=localStorage.getItem("user_Id");
  const [employee, setEmployee] = useState({
    fullName: "",
    empCode: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    country: "",
    emailId: "",
    contactNo: "",
    identification: "",
    idNumber: "",
    employeeType: "",
    joiningDate: "",
    bloodGroup: "",
    password: "",
    role: "",
    designation: "",
    department: "",
    panNo: "",
    bankName: "",
    bankAccountNo: "",
    iFSCCode: "",
    pfAccountNo: "",
    photograph: "",
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}employees/${id}`)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setEmployee({
      ...employee,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", employee.fullName);
    Object.keys(employee).forEach((key) => {
      if (employee[key] !== null && employee[key] !== "") {
        formData.append(key, employee[key]);
      }
    });

    axios
      .put(`${apiUrl}employees/update/${id}`, formData, {
        headers:{
          "Content-Type": "multipart/form-data",
          "user_Id": localStorage.getItem("user_id")
        }
      }
    )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Employee updated successfully.",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(`/hrdashboard/EmployeeList`); // Redirect after successful update
        });
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          title: error.response?.data?.error,
          text: error.response?.data?.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);

        console.error("Error updating employee data:", error);
      });
  };
  // ml-[26%] w-[74%] md:ml-[32%] md:w-[68%] lg:ml-[22%] lg:w-[78%] xl:ml-[20%] xl:w-[80%]
  return (
    <div className="container-fluid align-self-start align-self-md-center">
      <form
        className="bg-black-50 p-2 rounded shadow-sm "
        onSubmit={handleSubmit}
      >
        <h5 className="text-center  text-light ">EmployeeDetails</h5>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1 ">
            <label className="col-sm-4 col-form-label text-light">
              Full Name:
            </label>

            <input
              type="text"
              className="form-control"
              name="fullName"
              value={employee.fullName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Employee Code:
            </label>
            <input
              type="text"
              className="form-control"
              name="empCode"
              value={employee.empCode || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Date of Birth:
            </label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={employee.dob ? employee.dob.slice(0, 10) : ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Gender:
            </label>
            <input
              type="text"
              className="form-control"
              name="gender"
              value={employee.gender || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Marital Status:
            </label>
            <select
              className="form-control"
              name="maritalStatus"
              value={employee.maritalStatus || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Marital Status
              </option>
              <option value="Single">Single</option>
              <option value="Cohabitation">Cohabitation</option>
              <option value="Married">Married</option>
              <option value="Registered Partnership">
                Registered Partnership
              </option>
              <option value="Have been Married Before">
                Have been Married Before
              </option>
              <option value="Widow">Widow</option>
            </select>
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Nationality:
            </label>
            <input
              type="text"
              className="form-control"
              name="nationality"
              value={employee.nationality || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={employee.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">City:</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={employee.city || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">State:</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={employee.state || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={employee.country || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Email ID:
            </label>
            <input
              type="email"
              className="form-control"
              name="emailId"
              value={employee.emailId || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Contact Number:
            </label>
            <input
              type="text"
              className="form-control"
              name="contactNo"
              value={employee.contactNo || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Dapartment:
            </label>
            <input
              type="department"
              className="form-control"
              name="department"
              value={employee.department || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Designation:
            </label>
            <input
              type="text"
              className="form-control"
              name="designation"
              value={employee.designation || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Bank Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="bankName"
              value={employee.bankName || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Bank Account Number:
            </label>
            <input
              type="text"
              className="form-control"
              name="bankAccountNo"
              value={employee.bankAccountNo || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              IFSC Code:
            </label>
            <input
              type="text"
              className="form-control"
              name="iFSCCode"
              value={employee.iFSCCode || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-4 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              PF Account Number:
            </label>
            <input
              type="text"
              className="form-control"
              name="pfAccountNo"
              value={employee.pfAccountNo || ""}
              onChange={handleChange}
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
            <input
              type="text"
              className="form-control"
              id="inputemployeeType"
              placeholder="employeeType"
              value={employee.employeeType}
              required
              onChange={handleChange}
            />

          </div>
          <div className="col-12 col-md-4 col-lg-6 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Pan No:
            </label>
            <input
              type="text"
              className="form-control"
              name="panNo"
              value={employee.panNo || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-4 col-lg-6 mt-1">
            <label className="col-sm-4 col-form-label text-light">
              Photograph:
            </label>
            <input
              type="file"
              className="form-control"
              name="photograph"
              // value={employee.photograph||""}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn  btn-block button mt-2"
          disabled={loading}
        >
          {loading ? (
            <span>
              <i className="spinner-border spinner-border-sm" role="status"></i>
              uploading...
            </span>
          ) : (
            "Update Employee"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
