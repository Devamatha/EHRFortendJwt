import React from "react";
 import "../../adminDashboard/AdminDashboardHeader/AdminHeader.css";
//import "./Header.css"
function Header() {
 

  const UserName = sessionStorage.getItem("fullName");
  const empId = sessionStorage.getItem("empId")

  return (
    <div style={{ position:'sticky',zIndex:"9", top:"0"}} className="header-containerr totalPage">

    <div className="container-fluid">

      <ul className="nav justify-content-end align-items-center">
        <div className="d-flex ">
          <div className="form nav-item">
            <form>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
            </form>
          </div>
          <div className="items d-flex ">
            <img
              className="nav-item"
              src="https://img.icons8.com/ios-filled/30/settings.png"
              alt="settings"
            />

            <img
              className="nav-item"
              src="https://img.icons8.com/material-sharp/30/bell.png"
              alt="bell"
            />

            <img
              className="nav-item"
              src="https://img.icons8.com/pastel-glyph/30/person-male--v3.png"
              alt="person-male--v3"

            />
            <div className="nav-item">
            <button
                className="btn button w-100 text-light buttondata"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {UserName}
              </button>
              </div>
          </div>
        </div>
      </ul>
      </div>
      </div>
  );
}

export default Header;
