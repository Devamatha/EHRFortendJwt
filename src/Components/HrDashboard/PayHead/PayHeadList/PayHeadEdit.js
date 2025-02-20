import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getXsrfToken } from "../../../../App.js";
import axiosInstance from "./../../../../axiosInstance.js";

// import '../AddPayHead.css';
const PayHeadEdit = () => {
  const [payHeadName, setpayHeadName] = useState("");
  const [payHeadDescription, setpayHeadDescription] = useState("");
  const [payHeadType, setpayHeadType] = useState("");
  const storedId = sessionStorage.getItem("user_id");

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [loading, setLoading] = useState(false);
  const { payId } = useParams();
  const xsrfToken = getXsrfToken();

  useEffect(() => {
    fetchPayHeadById();
  }, [payId]);

  const fetchPayHeadById = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}payHeads/${payId}`, {
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
          //"x-xsrf-token":xsrfToken
        },
        withCredentials: true,
      });
      const data = response.data;

      setpayHeadName(data.payHeadName);
      setpayHeadDescription(data.payHeadDescription);
      setpayHeadType(data.payHeadType);
    } catch (error) {
      // console.log('Error Fetching details',error);
    }
  };

  const handleaddJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("payHeadName", payHeadName);
      formData.append("payHeadDescription", payHeadDescription);
      formData.append("payHeadType", payHeadType);

      const response = await axiosInstance.put(
        `${apiUrl}payHeads/update/${payId}`,

        formData,
        {
          headers: {
            user_Id: storedId,
            Authorization: sessionStorage.getItem("Authorization"),
            //"x-xsrf-token":xsrfToken
          },
          withCredentials: true,
        }
      );

      Swal.fire({
        icon: "success",
        title: " Pay Head updated  Successfullyl",
        text: "The add Pay Head has been successfully updated!",
      }).then((result) => {
        navigate("/hrdashboard/PayHeadList");
      });

      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.error,
        text: error.response?.data?.message,
      });
      setLoading(false);

      // setErrorMessage("An error occurred. Please try again.");
      console.error("Job addition error:", error);
    }
  };

  return (
    <div className=" ml-[25%] w-[75%] md:ml-[32%] md:w-[68%] lg:ml-[10%] lg:w-[90%]">
      <div className="container-fluid  d-flex justify-content-center align-items-center totalPage addPayHead mt-[10%] h-[90%]">
        <form
          onSubmit={handleaddJob}
          className="bg-black-50 p-4 rounded shadow-sm form-width"
        >
          <h3 className="text-light text-center">Edit Pay Head Details</h3>

          <div className="form-group row mt-2">
            <label
              htmlFor="inputpayHeadName"
              className="col-sm-4 col-form-label text-light"
            >
              PayHeadName :
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="inputpayHeadName"
                placeholder="payHeadName"
                value={payHeadName}
                onChange={(e) => setpayHeadName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="inputpayHeadDescription"
              className="col-sm-4 col-form-label text-light"
            >
              Description :
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="inputpayHeadDescription"
                value={payHeadDescription}
                onChange={(e) => setpayHeadDescription(e.target.value)}
                placeholder="payHeadDescription"
              />
            </div>
          </div>

          <div className="form-group row mt-2">
            <label
              htmlFor="payHeadType"
              className="col-sm-4 col-form-label text-light"
            >
              PayHeadType :
            </label>
            <div className="col-sm-8">
              <select
                className="form-control"
                id="payHeadType"
                value={payHeadType}
                onChange={(e) => setpayHeadType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select PayHead Type
                </option>
                <option value="Earning">Earnings</option>
                <option value="Deductions">Deductions</option>
              </select>
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
                    ></i>
                    updating
                  </span>
                ) : (
                  " Update Details"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayHeadEdit;
