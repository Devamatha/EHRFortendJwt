import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { getXsrfToken } from "../../App.js";

const EditJobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = useParams();
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [loading,setLoading]=useState(false);
  // Default jobDetails from location state
  const { jobDetails: initialJobDetails } = location.state || {};

  // State to manage job details
  const [jobData, setJobData] = useState({
    jobTitle: initialJobDetails?.jobTitle || "",
 //   jobkeyskills: initialJobDetails?.jobkeyskills.join(', ') || "",
    createdAt: initialJobDetails ? new Date(initialJobDetails.createdAt).toISOString().split('T')[0] : "",
    yearsOfExperience: initialJobDetails?.yearsOfExperience || "",
    noOfVacancies: initialJobDetails?.noOfVacancies || "",
    overallPercentage: initialJobDetails?.overallPercentage||"", // Remove '%' symbol if present
  });

  // Fetch job details if not available in location state
  useEffect(() => {
    if (!initialJobDetails) {
      axios.get(`${apiUrl}JobDetails/${jobId}` ,{
        headers: {
          "Authorization": sessionStorage.getItem('Authorization')
        },
        observe: 'response',
        credentials: 'include',
           withCredentials: true,
      }
      )
        .then(response => {
          setJobData({
            jobTitle: response.data.jobTitle || "",
            //jobkeyskills: response.data.jobkeyskills.join(', ') || "",
            createdAt: new Date(response.data.createdAt).toISOString().split('T')[0] || "",
            yearsOfExperience: response.data.yearsOfExperience || "",
            noOfVacancies: response.data.noOfVacancies || "",
            overallPercentage: response.data.overallPercentage.replace('%', '') || "", // Remove '%' symbol if present
          });
        })
        .catch(error => {
          console.error("Error fetching job details", error);
        });
    }
  }, [initialJobDetails, jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };
  const xsrfToken = getXsrfToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    setLoading(true);
    const updatedJobDetails = {
      ...jobData,
      //jobkeyskills: jobData.jobkeyskills.split(',').map(skill => skill.trim()), // Convert string to array
      overallPercentage: jobData.overallPercentage, // Ensure '%' symbol is removed
    };

    axios
      .put(`${apiUrl}JobDetails/update/${jobId}`, updatedJobDetails,{
        headers:{
          user_Id: localStorage.getItem("user_id"),
          "Authorization": sessionStorage.getItem('Authorization'),
          //"x-xsrf-token":xsrfToken
        },
        observe: 'response',
        credentials: 'include',
           withCredentials: true,
      })
      .then(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Job details updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/hrdashboard/listJobDetails');
        });
        setLoading(false);
        setJobData("");
      })
      .catch(error => {
        Swal.fire({
          title: error.response?.data?.error,
          text: error.response?.data?.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error("Error updating job details", error);
        setLoading(false);
        setJobData("");

      });
  };

  return (
    <div className="">
    <div className="container-fluid  totalPage  text-light">
      <form onSubmit={handleSubmit} className="bg-black-50 p-4 rounded shadow-sm">
      <h2 className="mb-4 text-light">Edit Job Details</h2>

        <div className="row mb-3">
          <label htmlFor="jobTitle" className="col-sm-5 col-md-5 col-form-label text-light">Job Title :</label>
          <div className="col-sm-7  col-md-7 ">
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              className="form-control"
              value={jobData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* <div className="row mb-3">
          <label htmlFor="jobkeyskills" className="col-sm-5 col-md-5 col-form-label text-light">Job Key Skills :</label>
          <div className="col-sm-7  col-md-7 ">
            <input
              type="text"
              id="jobkeyskills"
              name="jobkeyskills"
              className="form-control"
              value={jobData.jobkeyskills}
              onChange={handleChange}
              required
            />
          </div>
        </div> */}

        <div className="row mb-3">
          <label htmlFor="yearsOfExperience" className="col-sm-5 col-md-5 col-form-label text-light">Years of Experience :</label>
          <div className="col-sm-7  col-md-7 ">
            <input
              type="number"
              id="yearsOfExperience"
              name="yearsOfExperience"
              className="form-control"
              value={jobData.yearsOfExperience}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="noOfVacancies" className="col-sm-5 col-md-5 col-form-label text-light">No. of Vacancies :</label>
          <div className="col-sm-7  col-md-7 ">
            <input
              type="number"
              id="noOfVacancies"
              name="noOfVacancies"
              className="form-control"
              value={jobData.noOfVacancies}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="overallPercentage" className="col-sm-5 col-md-5 col-form-label text-light">Overall Percentage :</label>
          <div className="col-sm-7  col-md-7 ">
            <input
              type="text"
              id="overallPercentage"
              name="overallPercentage"
              className="form-control"
              value={jobData.overallPercentage}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* <button type="submit" className="btn btn-primary">Update Job Details</button> */}
        <div className="form-group row mt-4">
          <div className="col-sm-12 text-center">
            <button type="submit" className="btn button w-100" disabled={loading}>
              {loading?(
            <span>
            <i className="spinner-border spinner-border-sm" role="status"></i>
              updating...
            </span>
              ):(
                "Update Job Details"
              )
              }
            
            </button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditJobDetails;
