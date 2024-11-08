import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import './AddPackage.css';
import Cookies from 'js-cookie';
const AddPackage = () => {
  const [planType, setPlanType] = useState("Monthly"); // Default value
  const [amount, setAmount] = useState(0);
  //const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [discription, setDescription] = useState("");
  const [additionalFeatures, setAdditionalFeatures] = useState("");
  const [totalResumes, settotalResumes] = useState(0);
  const adminId = localStorage.getItem("admin_Id");
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const calculatedTotal = amount / totalResumes;
    setTotal(calculatedTotal);
  }, [amount, totalResumes]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPlan = {
      planType,
      amount,
      // startDate,
      // endDate,
      discription,
      totalResumes,
      additionalFeatures,
    };
    const xsrfToken = sessionStorage.getItem('XSRF-TOKEN');
  const authorizationToken = sessionStorage.getItem('Authorization');
    const headers = {
      "Authorization": authorizationToken,
      "X-XSRF-TOKEN":Cookies.get('XSRF-TOKEN')
    }
    try {
      const response = await axios.post(
        `${apiUrl}plan/save/${adminId}`,
        newPlan,
        
          { headers,
        observe: 'response',
        credentials: 'include'
           },
         
         
        
      );
      // console.log("Subscription Plan created:", response.data);

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "Subscription Plan created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Optionally, you can clear the form here
        setPlanType("Monthly");
        setAmount(0);
        // setStartDate("");
        // setEndDate("");
        setDescription("");
        setAdditionalFeatures("");
      });
    } catch (error) {
      console.error(
        "There was an error creating the subscription plan!",
        error
      );

      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "There was an error creating the subscription plan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="">
      <div className="container-fluid   mt-5  addPackage ">
        <form
          onSubmit={handleSubmit}
          className="bg-black-50 p-4 rounded shadow-sm form-width"
        >
          <h5 className="text-light text-center">Add Plan</h5>

          <div className="form-group row mt-1">
            <label
              htmlFor="planType"
              className="col-sm-5 col-form-label text-light"
            >
              Plan Type
            </label>
            <div className="col-sm-7">
              <select
                id="planType"
                className="form-select"
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                required
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
                <option value="LifeTime">LifeTime</option>
              </select>
            </div>
          </div>

          <div className="form-group row mt-1">
            <label
              htmlFor="amount"
              className="col-sm-5 col-form-label text-light"
            >
              Amount
            </label>
            <div className="col-sm-7">
              <input
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
         

          {planType === "LifeTime" && (
            <div className="form-group row mt-1">
              <label
                htmlFor="totalResumes"
                className="col-sm-5 col-form-label text-light"
              >
                Total Resumes
              </label>
              <div className="col-sm-7">
                <input
                  type="number"
                  id="totalResumes"
                  className="form-control"
                  value={totalResumes}
                  onChange={(e) =>settotalResumes(parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>
          )}
           {planType === "LifeTime" && (
            <div className="form-group row mt-1">
              <label
                htmlFor="AmountPerResumes"
                className="col-sm-5 col-form-label text-light"
              >
                AmountPerResume
              </label>
              <div className="col-sm-7">
                <input
                  type="number"
                  id="AmountPerResumes"
                  className="form-control"
                  value={total}
                 disabled
                />
              </div>
            </div>
          )}
          {/* 
        <div className="form-group row mt-1">
          <label htmlFor="startDate" className="col-sm-5 col-form-label text-light">Start Date</label>
          <div className="col-sm-7">
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row mt-1">
          <label htmlFor="endDate" className="col-sm-5 col-form-label text-light">End Date</label>
          <div className="col-sm-7">
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div> */}

          <div className="form-group row mt-1">
            <label
              htmlFor="description"
              className="col-sm-5 col-form-label text-light"
            >
              Description
            </label>
            <div className="col-sm-7">
              <textarea
                id="description"
                className="form-control"
                value={discription}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              />
            </div>
          </div>

          <div className="form-group row mt-1">
            <label
              htmlFor="additionalFeatures"
              className="col-sm-5 col-form-label text-light"
            >
              Additional Features
            </label>
            <div className="col-sm-7">
              <textarea
                id="additionalFeatures"
                className="form-control"
                value={additionalFeatures}
                onChange={(e) => setAdditionalFeatures(e.target.value)}
                rows="3"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;