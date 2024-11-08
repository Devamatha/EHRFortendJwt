import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
function AddHoliday() {
  const [holidayTitle, setholidayTitle] = useState("");
  const [description, setdescription] = useState("");
  const [holidayDate, setholidayDate] = useState("");
  const [holidayType, setholidayType] = useState("");
  const userid = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const handleaddJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}holidays/user/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "user_Id": userid
        },
        body: JSON.stringify({
          holidayTitle: holidayTitle,
          description: description,
          holidayDate: holidayDate,
          holidayType: holidayType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., store JWT token, redirect to another page, etc.
        // console.log("Login successful:", data);
        Swal.fire({
          icon: "success",
          title: "Holiday Added Successfullyl",
          text: "The Holiday has been successfully added!",
        });
      } else {
        const errorData = await response.json();
        //  setErrorMessage(errorData.error || "Login failed. Please try again.");
        Swal.fire({
          icon: "error",
          title: errorData.error,
          text: errorData.message,
        });
      }
      setLoading(false);
      setholidayTitle("");
      setdescription("");
      setholidayDate("");
      setholidayType("");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: error.error,
        text: error.message,
      });
      // setErrorMessage("An error occurred. Please try again.");
      console.error("Job addition error:", error);
      setholidayTitle("");
      setdescription("");
      setholidayDate("");
      setholidayType("");
    }
  };
  // ml-[31%] w-[69%] md:ml-[31%] md:w-[69%] lg:ml-[10%] lg:w-[90%]
  return (
    <div className=" ">
      <div className="container-fluid ">
        <form
          onSubmit={handleaddJob}
          className="bg-black-50 p-4 rounded shadow-sm form-width"
        >
          <h3 className="text-light text-center">Add Holiday</h3>

          <div className="form-group row mt-2">
            <label
              htmlFor="inputholidayTitle"
              className="col-sm-5 col-md-5 col-form-label text-light"
            >
              HolidayTitle
            </label>
            <div className="col-sm-7 col-md-7">
              <input
                type="text"
                className="form-control"
                id="inputholidayTitle"
                placeholder="HolidayTitle"
                value={holidayTitle}
                onChange={(e) => setholidayTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="inputdescription"
              className="col-sm-5 col-md-5 col-form-label text-light"
            >
              Holiday Description
            </label>
            <div className="col-sm-7 col-md-7">
              <input
                type="text"
                className="form-control"
                id="inputdescription"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Description"
                required
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="inputholidayDate"
              className="col-sm-5 col-md-5 col-form-label text-light"
            >
              HolidayDate
            </label>
            <div className="col-sm-7 col-md-7">
              <input
                type="date"
                className="form-control"
                id="inputholidayDate"
                value={holidayDate}
                onChange={(e) => setholidayDate(e.target.value)}
                placeholder="Holiday Date"
                required
              />
            </div>
          </div>

          <div className="form-group row mt-2">
            <label
              htmlFor="holidayType"
              className="col-sm-5 col-md-5 col-form-label text-light"
            >
              Holiday Type
            </label>
            <div className="col-sm-7 col-md-7">
              <select
                className="form-control"
                id="holidayType"
                value={holidayType}
                onChange={(e) => setholidayType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Holiday Type
                </option>
                <option value="Compulsory Holiday">Compulsory Holiday</option>
                <option value="Restricted Holiday">Restricted Holiday</option>
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
                    ></i>{" "}
                    Adding...
                  </span>
                ) : (
                  "Add Holday"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHoliday;
