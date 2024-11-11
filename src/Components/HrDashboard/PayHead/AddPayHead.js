import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function AddPayHead() {
  const [payHeadName, setpayHeadName] = useState("");
  const [payHeadDescription, setpayHeadDescription] = useState("");
  const [payHeadType, setpayHeadType] = useState("");
  const storedId = localStorage.getItem("user_id");
  const [loading, setLoading] = useState("");
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const handleaddJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${apiUrl}payHeads/user/${storedId}`, 
        {
          payHeadName: payHeadName,
          payHeadDescription: payHeadDescription,
          payHeadType: payHeadType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "user_Id": storedId,
            "Authorization": sessionStorage.getItem('Authorization'),
            "x-xsrf-token":sessionStorage.getItem('XSRF-TOKEN')
          },
          observe: 'response',
          credentials: 'include',
          withCredentials: true
        }
      );
  
      Swal.fire({
        icon: "success",
        title: "Pay Head Added Successfully",
        text: "The Pay Head has been successfully added!",
      });
      
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.error || "Error",
        text: error.response?.data?.message || "An unknown error occurred.",
      });
      setLoading(false);
    }
  };
  
  return (
    <div className="">
      <div className="container-fluid">
        <form
          onSubmit={handleaddJob}
          className="bg-black-50 p-4 rounded shadow-sm form-width "
        >
          <h3 className="text-light text-center">Add Pay Head Data</h3>

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
                required
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
                required
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
                    adding...
                  </span>
                ) : (
                  "Add Pay Head"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPayHead;
