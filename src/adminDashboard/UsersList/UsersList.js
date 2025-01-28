import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "./../../axiosInstance";

function UsersList() {
  const [allUsers, setAllUsers] = useState([]);
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [hasNoData, setHasNoData] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // Fetch data from the API endpoint
    setisLoading(true);

    axiosInstance
      .get(`${apiUrl}users/allUsers`,{
        headers: {
          "Authorization": sessionStorage.getItem('Authorization'),
        }
      })
      .then((response) => {
        // Extract the addJobDetails array and store it in state
        setAllUsers(response.data.reverse());
        setisLoading(false);
        setHasNoData(response.data.length === 0);
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
        setisLoading(false);

      });
  }, []);

  return (
    <div className="w-[100%]">
         {isLoading ? (
        // Spinner while loading
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) :hasNoData?(
        <div className="alert alert-warning text-center">No data found!</div>
 
      ):(
      <div className="table-container table-responsive text-center rounded shadow-sm usersdata m-5">
      <h5 className="text-light text-center"> Users List</h5>
        <table className="table-active table-striped table-hover ">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Full Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Address</th>
              <th scope="col">AuthorizedCompanyName</th>
              <th scope="col">companyName</th>
              {/* <th scope="col">Password</th> */}
            </tr>
          </thead>
          <tbody>
            {allUsers.map((all, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{all.fullName}</td>
                <td>{all.email}</td>
                <td>{all.mobileNumber}</td>
                <td>{all.address}</td>
                <td>{all.authorizedCompanyName}</td>
                <td>{all.companyName}</td>
                {/* <td>{all.password}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
          
  );
}

export default UsersList;
