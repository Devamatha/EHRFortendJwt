import React, { useState } from "react";
import CONTACT from "../../assets/images/Vector (2).png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./../../index.css";
import Header from "../../UIcomponents/header/Header";
import Footer from "../footer/Footer";
import Cookies from 'js-cookie';

function Login() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [username, setUername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // function getCookie(name) {
  //   const nameEQ = name + "=";
  //   const ca = document.cookie.split(';');
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ)   
  //  === 0) return c.substring(nameEQ.length, c.length);
  //   }
  //   return  null;
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    let formErrors = { username: "", password: "" };

    if (!username) {
      formErrors.username = "Enter your email";
    } else if (!/\S+@gmail\.com/.test(username)) {
      formErrors.username =
        "Enter a valid email (example@gmail.com)";
    }

    if (!password) {
      formErrors.password = "Enter your password";
    } else if (password.length < 5) {
      formErrors.password = "Password should be at least 5 characters long";
    }

    setErrors(formErrors);

    if (!formErrors.username && !formErrors.password) {
      // console.log("Logging in with:", { username, password });
      try {
        const response = await fetch(`${apiUrl}clients/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          credentials: 'include',
        });
   
        console.log(response);
     
        


        if (response.ok) {
          const data = await response.json();
          window.sessionStorage.setItem("Authorization",response.headers.get('Authorization'));
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You have successfully logged in!",
          });
          if (data.role === "ROLE_ADMIN") {
            // console.log("admindash");
            localStorage.setItem("admin_Id", data.id);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("role", data.role);
            navigate("/AdminDashboard");
          } else if (data.role === "ROLE_EMPLOYEE") {
            localStorage.setItem("empId", data.id);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("role", data.role);

            navigate("/EmployeeDashboard");

            // console.log("employee");
          } else if (data.role === "ROLE_HR") {
            localStorage.setItem("user_id", data.id);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("role", data.role);

            navigate("/hrdashboard");
          } else {
          }
          setLoading(false);
         
        } else {
          const errorData = await response.json();
         
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: errorData.error || "Login failed. Please try again.",
          });
          setLoading(false);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
        });
        // setErrorMessage("An error occurred. Please try again.");
        setLoading(false);

        console.error("Login error:", error);
      }
    }
  };

  const handleEmailFocus = () => {
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const handlePasswordFocus = () => {
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  };

  return (
    <div className="bg-img">
      <div className="max-w-1440  lg:w-[100%]  mx-auto  ">
        <div className="px-[30px]">
          <Header />
        </div>
        <div className=" h-screen flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h1 className="text-white md:text-[48px] text-[28px] text-center font-bold md:leading-[56px] leading-[32.79px] totalPage">
                Welcome Back
              </h1>
              <p className="font-normal text-white md:text-[16px] text-[14px] text-center">
                Sign in to continue exploring and enjoying all the features we
                have to offer.
              </p>
            </div>
            <div className="auth-card py-[36px] md:px-[36px] px-[30px]  rounded-[6px] md:mx-0 mx-4">
              <div className="mb-4 h-[90px]">
                <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
                  Enter your Mail-ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-white outline-none"
                    value={username}
                    onChange={(e) => setUername(e.target.value)}
                    onFocus={handleEmailFocus}
                  />
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer">
                    <img
                      src={CONTACT}
                      alt="contact-img"
                      className="md:h-[20px] h-[13px] md:w-[24px] h-[13px]"
                    />
                  </div>
                </div>
                {errors.username && (
                  <p className="text-red-500 md:text-[16px] text-[13px] mt-1">
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
                  Enter Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-lg bg-white outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handlePasswordFocus}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="md:h-[24px] h-[20px] md:w-[24px] h-[20px]" />
                    ) : (
                      <FaEye className="md:h-[24px] h-[20px] md:w-[24px] h-[20px]" />
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-5 flex justify-between">
                <div>
                  {errors.password && (
                    <p className="md:text-[16px] text-[13px] text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <p
                    className="text-end md:text-[18px] text-[16px] text-white cursor-pointer"
                    onClick={() => navigate("/ResetPassword")}
                  >
                    Forget Password
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-full bg-[#000000] text-[24px] text-white h-[50px] rounded-[5px] hover:bg-[#c445fe] transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <i
                        className="spinner-border spinner-border-sm"
                        role="status"
                      ></i>
                      Logging...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="mt-7">
                <p className="text-white md:text-[18px] text-[16px]">
                  Don't have an account?{" "}
                  <span
                    className="font-bold cursor-pointer md:text-[20px] text-[18px]"
                    onClick={() => navigate("/Signup")}
                  >
                    Sign Up For Free
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
