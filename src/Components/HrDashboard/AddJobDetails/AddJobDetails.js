import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate} from "react-router-dom";
import { getXsrfToken } from "../../../App.js";

function AddJobDetails() {
  const [jobTitle, setjobTitle] = useState("");
  //const [jobkeyskills, setjobkeyskills] = useState([]);
  const [yearsOfExperience, setyearsOfExperience] = useState("");
  const [noOfVacancies, setnoOfVacancies] = useState("");
  const [overallPercentage, setoverallPercentage] = useState("");
  const storedId = localStorage.getItem("user_id");
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const navigate = useNavigate();
  const xsrfToken = getXsrfToken();

  const [loading, setLoading] = useState(false);
  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    const percentageWithSymbol = `${overallPercentage}`;

    try {
      const response = await fetch(`${apiUrl}JobDetails/addJob/${storedId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user_Id": storedId,
          "Authorization": sessionStorage.getItem('Authorization'),
          //"x-xsrf-token":xsrfToken
        },
        observe: 'response',
        credentials: 'include',
        withCredentials: true,

        body: JSON.stringify({
          jobTitle,
          //jobkeyskills: jobkeyskills,
          yearsOfExperience,
          noOfVacancies,
          overallPercentage: percentageWithSymbol,
        }),
      });

      setLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: errorData.error,
          text: errorData.message || "An unknown error occurred.",
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Job Added Successfully",
          text: "The job has been successfully added!",
        }).then(()=>{
          navigate('/hrdashboard/listJobDetails');
        });
      }
      setjobTitle("");
      //setjobkeyskills([]);
      setyearsOfExperience("");
      setnoOfVacancies("");
      setoverallPercentage("");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: error.error,
        text: error.message,
        icon: "error"
      });
      console.error("Job addition error:", error);
      setjobTitle("");
      //setjobkeyskills([]);
      setyearsOfExperience("");
      setnoOfVacancies("");
      setoverallPercentage("");
    }
  };

  // const handleAddSkill = (skill) => {
  //   setjobkeyskills([...jobkeyskills, skill]);
  // };

  return (
    <div className="">
      <div className="container-fluid  totalPage  ">
        <form
          onSubmit={handleAddJob}
          className="bg-black-50 p-4 rounded shadow-sm "
        >
          <h5 className="text-light text-center">Add-Job-Details</h5>
          <div className="form-group row mt-2 ">
            <label
              htmlFor="inputJobTitle"
              className="col-sm-5 col-md-5  col-form-label text-light"
            >
              Job Title
            </label>

            <div className="col-sm-7  col-md-7 ">
              <input
                type="text"
                className="form-control"
                id="inputJobTitle"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setjobTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* {jobkeyskills.length > 0 && (
            <div className="form-group row mt-2">
              <label
                htmlFor="inputSkills"
                className="col-sm-5 col-md-5  col-form-label text-light "
              >
                Entered Skills:
              </label>

              <div className="col-sm-7  col-md-7 ">
                <input
                  type="text"
                  className="form-control"
                  id="enteredSkills"
                  value={jobkeyskills.join(", ")}
                  readOnly
                />
              </div>
            </div>
          )}
          <div className="form-group row mt-2 formaddJobDetails">
            <label
              htmlFor="inputSkills"
              className="col-sm-5 col-md-5  col-form-label text-light "
            >
              Job Key Skills
            </label>

            <div className="col-sm-7  col-md-7 ">
              <input
                type="text"
                className="form-control"
                id="inputSkills"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    e.preventDefault();
                    handleAddSkill(e.target.value.trim());
                    e.target.value = "";
                  }
                }}
                placeholder="Enter a skill and press Enter"
                
              />
            </div>
          </div> */}
          <div className="form-group row mt-2 formaddJobDetails">
            <label
              htmlFor="inputExperience"
              className="col-sm-5 col-md-5  col-form-label text-light "
            >
              YearsOfExperience
            </label>
            <div className="col-sm-7   col-md-7 ">
              <input
                type="number"
                className="form-control"
                id="inputExperience"
                value={yearsOfExperience}
                onChange={(e) => setyearsOfExperience(e.target.value)}
                placeholder="Years of Experience"
                required
              />
            </div>
          </div>

          <div className="form-group row mt-2 formaddJobDetails">
            <label
              htmlFor="noOfVacancies"
              className="col-sm-5 col-md-5  col-form-label text-light"
            >
              NumberOfVacancies
            </label>
            <div className="col-sm-7 ">
              <input
                type="number"
                className="form-control"
                id="noOfVacancies"
                value={noOfVacancies}
                onChange={(e) => setnoOfVacancies(e.target.value)}
                placeholder="Number of Vacancies"
                required
              />
            </div>
          </div>

          <div className="form-group row mt-2 formaddJobDetails">
            <label
              htmlFor="overallPercentage"
              className="col-sm-5 col-md-5  col-form-label text-light"
            >
              OverallPercentage
            </label>
            <div className="col-sm-7 ">
              <input
                type="text"
                className="form-control"
                id="overallPercentage"
                value={overallPercentage}
                onChange={(e) => setoverallPercentage(e.target.value)}
                placeholder="Overall Percentage"
                required
              />
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
                    Adding...
                  </span>
                ) : (
                  "Add Job Details"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJobDetails;
