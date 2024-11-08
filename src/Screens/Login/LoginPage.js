import React from "react";
import "./LoginPage.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../../UIcomponents/header/Header";

function LoginPage() {
  const [emailOrMobileNumber, setEmailOrMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // or 'application/json'
        },
        body: new URLSearchParams({
          emailOrMobileNumber: emailOrMobileNumber,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        //  setErrorMessage(errorData.error || "Login failed. Please try again.");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorData.error || "Login failed. Please try again.",
        });
      } else {
        const data = await response.json();
        // Handle successful login, e.g., store JWT token, redirect to another page, etc.
        // console.log("Login successful:", data);
        localStorage.setItem("user_id", data.photographer_Id);
        localStorage.setItem("admin_Id", data.admin_Id);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("empId", data.id);
        // console.log(data.role, "role");
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in!",
        });
        if (data.role === "admin") {
          // console.log("admindash");
          navigate("/AdminDashboard");
        } else if (data.role === "employee") {
          navigate("/EmployeeDashboard");
          // console.log("employee");
        } else if (data.role === "USER") {
          navigate("/hrdashboard");
        } else {
          // console.log("hrdashboard");
        }

        // setErrorMessage(data.error || "Login successful.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again.",
      });
      // setErrorMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };
  return (
    <div className="bg-img">
      <div className="max-w-1440  lg:w-[100%]  mx-auto  ">
        <div className="px-[30px]">
          <Header />
        </div>
        <div className="row justify-content-center totalPage">
          <div className="col-md-6 formdesign mt-5 text-center">
            <form onSubmit={handleLogin}>
              <div className="input-group form-floating mb-3 mt-3 ">
                <span className="input-group-text  " id="floatingInput">
                  <i className="bi bi-envelope"></i>
                </span>
                <div className="form-floating ">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email or mobilenumber"
                    value={emailOrMobileNumber}
                    onChange={(e) => setEmailOrMobileNumber(e.target.value)}
                    required
                  ></input>
                  <label htmlFor="floatingInput">Email OR MobileNumber</label>
                  <div>
                    <small className="error">
                      Please Enter Email or MobileNumber
                    </small>

                    <small className="error">
                      Enter a Valid .gmail/.org Email Or Enter Valid
                      MobileNumber
                    </small>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <label htmlFor="floatingPassword">password</label>
                  <span className="eye-icon">
                    <i className="bi"></i>
                  </span>

                  <div>
                    <small className="error">Please Enter Password</small>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <button type="submit" className="btn sign btn-primary me-2">
                    SignIn
                  </button>
                  {/* <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span> */}
                </div>
                <div className="col">
                  <button type="button" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
