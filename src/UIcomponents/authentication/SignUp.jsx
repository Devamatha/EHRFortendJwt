import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from '../header/Header';
import Footer from '../footer/Footer';


function SignUp() {
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const { plan } = location.state || {};
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    companyName: "",
    authorizedCompanyName: "",
    logo: null,
    address: "",
  });
  // console.log(formData, "formData");
  // State to hold validation errors
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    companyName: "",
    authorizedCompanyName: "",
    logo: "",
    address: "",
  });

  // Handle input changes
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Correctly destructure name and value
    setFormData({ ...formData, [name]: value }); // Update the formData state
    setErrors({ ...errors, [name]: "" }); // Clear error when input changes
  };


  const [error, setError] = useState("");
  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) { 
        setError("File with maximum size of 1MB is allowed");
        return;
      }
      setError("");
      setSelectedFileName(file.name);
      setFormData({ ...formData, logo: file });
    } else {
      setSelectedFileName("");
      setFormData({ ...formData, logo: null });
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const validationErrors = {};
    if (!formData.fullName) {
      validationErrors.fullName = "Please enter your name";
    }
    if (!formData.email) {
      validationErrors.email = "Please enter your email";
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email";
    }
    if (!formData.mobileNumber) {
      validationErrors.mobileNumber = "Please enter your mobileNumber number";
    } else if (formData.mobileNumber.length !== 10) {
      validationErrors.mobileNumber = "mobileNumber number must be 10 digits";
    }
    if (!formData.companyName) {
      validationErrors.companyName = "Please enter your company name";
    }
    if (!formData.authorizedCompanyName) {
      validationErrors.authorizedCompanyName =
        "Please enter your authorized company name";
    }
    if (!formData.logo) {
      validationErrors.logo = "Please enter logo";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!formData.address) {
      validationErrors.address = "Please enter Address";
    }

    // const formDataToSend = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   formDataToSend.append(key, formData[key]);
    // });
    // formDataToSend.append("subscription_id", Number(plan.subscription_Id));
    const payDetails = plan;
     console.log(payDetails + "payDetails");
    // console.log(payDetails.amount + "amount");
    const payDetailslist = {
      amount: payDetails.amount,
      planType: payDetails.planType,
      totalResumes: payDetails.totalResumes,
      
    };
    
    if (payDetailslist.amount) {
      generateOrderId(payDetailslist, e);
    } else {
      Swal.fire({
        title: "please select the plan details ?",
        text: "please select the plan details ?",
        icon: "info",
      });
    }
    // try {
    //   const response = await axios.post(
    //     `${apiUrl}users/register`,
    //     formDataToSend,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   setIsLoading(false);
    //   // console.log("Success:", response.data);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const handleSubmitForm = async (payDetails,e) => {
    setIsLoading(true);
    e.preventDefault();
    // const validationErrors = {};
    // if (!formData.fullName) {
    //   validationErrors.fullName = "Please enter your name";
    // }
    // if (!formData.email) {
    //   validationErrors.email = "Please enter your email";
    // } else if (!isValidEmail(formData.email)) {
    //   validationErrors.email = "Please enter a valid email";
    // }
    // if (!formData.mobileNumber) {
    //   validationErrors.mobileNumber = "Please enter your mobileNumber number";
    // } else if (formData.mobileNumber.length !== 10) {
    //   validationErrors.mobileNumber = "mobileNumber number must be 10 digits";
    // }
    // if (!formData.companyName) {
    //   validationErrors.companyName = "Please enter your company name";
    // }
    // if (!formData.authorizedCompanyName) {
    //   validationErrors.authorizedCompanyName =
    //     "Please enter your authorized company name";
    // }
    // if (!formData.logo) {
    //   validationErrors.logo = "Please enter logo";
    // }

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    // if (!formData.address) {
    //   validationErrors.address = "Please enter Address";
    // }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append("role","ROLE_HR")

    // console.log(Id, "Id");
    try {
      const response = await axios.post(
        `${apiUrl}clients/save`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      console.log(response.data, "response.data");
    
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        companyName: "",
        authorizedCompanyName: "",
        logo: null,
        address: "",
      });
      setIsLoading(false);

      subScriptionadd(payDetails, response.data.id
      );
      // console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
      
      Swal.fire({
        title: error.message,
        text: error.message,
        icon: "error",
      });
      setIsLoading(false);

    }
  };

  var payNow = (response, e, payDetails) => {
    // console.log(response.data.oder_id, "response.data.oder_id");
    var options = {
      key: "rzp_test_P7eTEWTbR1y2Sm",
      key_secret: "gFMj8IVEIJuIKBOEeqRzslPt",
      amount: payDetails.amount * 100,
      currency: "INR",
      name: "Get Photo Application",
      description: "Sample Razorpay demo",

      order_id: response.data.oder_id,
      //   image: "https://i.imgur.com/FApqk3D.jpeg",

      handler: function (response) {
        alert(response.razorpay_payment_id, "success");
        alert(response.razorpay_order_id, "success");
        alert(response.razorpay_signature, "success");
         handleSubmitForm(payDetails,e);
       
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "+917416244195",
      },
      notes: {
        address: "Razorpay corporate office",
      },
      theme: {
        color: "#6466e3",
      },
    };
    var rzp1 = new window.Razorpay(options);

    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code, "response.error.code");
      alert(response.error.description, "response.error.description");
      alert(response.error.source, "response.error.source");
      alert(response.error.step, "response.error.step");
      alert(response.error.reason, "response.error.reason");
      alert(
        response.error.metadata.order_id,
        "response.error.metadata.order_id"
      );
      alert(
        response.error.metadata.payment_id,
        "response.error.metadata.payment_id"
      );
    });
  };
   const generateOrderId = async (payDetails, e) => {
    try {
      const response = await axios.post(
        `${apiUrl}oderId/save/oderId`,
        payDetails
      );
      // console.log("Server Response:", response.data);
      // console.log("Amount:", payDetails.amount);
      // console.log("Server Response:", response.data.oder_id);

      if (payDetails.amount && payDetails.planType) {
        payNow(response, e, payDetails);
      } else {
        Swal.fire({
          title: "paydetails details ?",
          text: "paydetails details ?",
          icon: "info",
        });
      }
    } catch (error) {
      console.error("Error generating order ID:", error);
    }
  };
  
  const subScriptionadd = async (payDetails, id) => {
    try {
      const response = await axios.post(
       ` ${apiUrl}subscriptions/save/${id}`,
        payDetails
      );
      Swal.fire({
        title: "form Submitted Successfully",
        text: "Data saved successfully",
        icon: "success",
      });
      // console.log("Server Response:", response.data.subscription_Id);
      // console.log("Amount:", payDetails.amount);
      // console.log("Server Response:", response.data.oder_id);

      //handleSubmitForm(e, response.data.subscription_Id);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      })
    }
  };
  return (
    <div className='bg-img'>
      <div className='max-w-1440  lg:w-[100%]  mx-auto  mb-2'>
      <div className='px-[30px]'>
          <Header />
        </div>
    <div className=" flex justify-center items-center min-h-screen totalPage">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h1 className="text-white md:text-[48px] text-[28px] text-center font-bold md:leading-[56px] leading-[32.79px]">
            Welcome Back
          </h1>
          <p className="font-normal text-white md:text-[16px] text-[14px] text-center">
            Sign in to continue exploring and enjoying all the features we have
            to offer.
          </p>
        </div>
        <div className="auth-card py-[36px] md:px-[36px] px-[30px]  rounded-[6px] opacity-90 md:mx-0 mx-4">
          <div className="mb-2 md:h-[90px] h-[80px]">
            <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
              full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white outline-none"
            />
            {errors.fullName && (
              <div className="text-red-500 mt-1 text-[14px]">
                {errors.fullName}
              </div>
            )}
          </div>

          <div className="mb-2 md:h-[90px] h-[80px]">
            <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white outline-none"
            />
            {errors.email && (
              <div className="text-red-500 mt-1 text-[14px]">
                {errors.email}
              </div>
            )}
          </div>

          <div className="mb-2 md:h-[90px] h-[80px]">
            <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white outline-none"
            />
            {errors.address && (
              <div className="text-red-500 mt-1 text-[14px]">
                {errors.address}
              </div>
            )}
          </div>

          <div className="mb-2 md:h-[90px] h-[80px]">
            <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
              mobileNumber
            </label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              maxLength={10}
              className="w-full px-4 py-2 rounded-lg bg-white outline-none"
            />
            {errors.mobileNumber && (
              <div className="text-red-500 mt-1 text-[14px]">
                {errors.mobileNumber}
              </div>
            )}
          </div>

          <div className="mb-2 md:h-[90px] h-[80px]">
            <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white outline-none"
            />
            {errors.companyName && (
              <div className="text-red-500 mt-1 text-[14px]">
                {errors.companyName}
              </div>
            )}
          </div>

          <div className="mb-2 md:h-[90px] h-[80px]">
            <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
              Authorized Company Name
            </label>
            <input
              type="text"
              name="authorizedCompanyName"
              value={formData.authorizedCompanyName}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white outline-none"
            />
            {errors.authorizedCompanyName && (
              <div className="text-red-500 mt-1 text-[14px]">
                {errors.authorizedCompanyName}
              </div>
            )}
          </div>

          <div className="mb-4 md:h-[90px] h-[80px]">
            <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
              Logo
            </label>
            <div className="w-full px-4 py-2 rounded-lg border bg-white outline-none">
              <label
                htmlFor="file-upload"
                className="w-full py-2 rounded-lg bg-white text-black cursor-pointer text-center"
              >
                {selectedFileName || "Choose a file"}
              </label>
              <input
                id="file-upload"
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="hidden"
                required
                accept="image/*"
              

              />
            </div>
            {error && <p className="text-red-500 mt-1">{error}</p>}
           
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-full bg-[#000000] text-[24px] text-white h-[50px] rounded-[5px] hover:bg-[#c445fe] transition-colors"
            disabled={isLoading}
            >
              {isLoading?(
                <span>
                  <i className="spinner-border spinner-border-sm" role="status"></i>
                    wait...
                  </span>
              ):(
                "Register"
              )

              }
              
            </button>
          </div>
          <div className="mt-7">
            <p className="text-white md:text-[18px] text-[14px]">
              Already Have an account?{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log In
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

export default SignUp;
