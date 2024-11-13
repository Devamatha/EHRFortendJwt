import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'
import { getXsrfToken } from "../../../App.js";

const HoliDayTableDataEdit = () => {

  const [holidayTitle, setholidayTitle] = useState("");
  const [description, setdescription] = useState("");
  const [holidayDate, setholidayDate] = useState("");
  const [holidayType, setholidayType] = useState("");
  const storedId = localStorage.getItem("user_id");
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;


  const xsrfToken = getXsrfToken();

  const navigate = useNavigate();
const [loading,setLoading]=useState("");
  //Get Id
  const { jobId } = useParams();

  useEffect(() => {
    holiDayTableDataById();
  }, [jobId]);

  const holiDayTableDataById = async () => {
    // console.log(jobId);
    try {
      const response = await axios.get(`${apiUrl}holidays/${jobId}`,
      {
        headers: {
          "Authorization": sessionStorage.getItem('Authorization')
         
        },
        observe: 'response',
        credentials: 'include',
           withCredentials: true,
       }

      );
      const data = response.data;

      setholidayTitle(data.holidayTitle);
      setdescription(data.description);
      setholidayDate(data.holidayDate);
      setholidayType(data.holidayType);
    }
    catch (error) {
      // console.log('Error Fetching Data', error);
    }
  }

  //Edit

  const handleaddJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create a FormData object
    const formData = new FormData();
    formData.append("holidayTitle", holidayTitle);
    formData.append("description", description);
    formData.append("holidayDate", holidayDate);
    formData.append("holidayType", holidayType);

    try {
      const response = await fetch(
        `${apiUrl}holidays/update/${jobId}`,
        {
          method: "PUT",
          body: formData, 
          headers:{
            user_Id: storedId,
            "Authorization": sessionStorage.getItem("Authorization"),
          // "x-xsrf-token": xsrfToken,
          },
          observe: 'response',
          credentials: 'include',
             withCredentials: true,

        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: errorData.error,
          text: errorData.message ,
        });
      } else {
        const data = await response.json();
        // console.log("Holiday update successful:", data);
        Swal.fire({
          icon: "success",
          title: "Holiday updated Successfully",
          text: "The Holiday has been successfully updated!",
        });

        navigate('/hrdashboard/HolidayTableData');

       
      }
      setLoading(false);

    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: error.error,
        text: error.message,
      });
      console.error("Holiday update error:", error);
    }
};


// ml-[31%] w-[69%] md:ml-[31%] md:w-[69%] lg:ml-[10%] lg:w-[90%] 
  return (
    <div className=" newtabledata">
      <div className="container-fluid totalPage">
        <form
          onSubmit={handleaddJob}
          className=" form-width bg-black-50 rounded shadow-sm p-4"
        >
          <h3 className="text-light text-center">Edit Holiday Data</h3>

          <div className="form-group row mt-2">
            <label
              htmlFor="inputholidayTitle"
              className="col-sm-5  col-lg-4  col-xl-3  col-form-label text-light"
            >
              HolidayTitle
            </label>
            <div className="col-sm-7  col-lg-8  col-xl-9 ">
              <input
                type="text"
                className="form-control"
                id="inputholidayTitle"
                placeholder="HolidayTitle"
                value={holidayTitle}
                onChange={(e) => setholidayTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="inputdescription"
              className="col-sm-5  col-lg-4  col-xl-3  col-form-label text-light"
            >
              Holiday Description
            </label>
            <div className="col-sm-7  col-lg-8  col-xl-9 ">
              <input
                type="text"
                className="form-control"
                id="inputdescription"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label
              htmlFor="inputholidayDate"
              className="col-sm-5   col-lg-4  col-xl-3  col-form-label text-light"
            >
              HolidayDate
            </label>
            <div className="col-sm-7  col-lg-8  col-xl-9 ">
              <input
                type="date"
                className="form-control"
                id="inputholidayDate"
                value={holidayDate}
                onChange={(e) => setholidayDate(e.target.value)}
                placeholder="Holiday Date"
              />
            </div>
          </div>

          <div className="form-group row mt-2">
            <label
              htmlFor="holidayType"
              className="col-sm-5  col-lg-4  col-xl-3  col-form-label text-light"
            >
              Holiday Type{" "}
            </label>
            <div className="col-sm-7  col-lg-8  col-xl-9 ">
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
              <button type="submit" className="btn button w-100" disabled={loading}>
                {loading?(
              <span>
              <i className="spinner-border spinner-border-sm" role="status"></i>
                updating...
              </span>
                ):(
                  "Update Details"
                )}
                
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HoliDayTableDataEdit
