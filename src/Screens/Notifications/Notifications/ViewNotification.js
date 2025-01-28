import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./../../../axiosInstance.js";

// import './ViewNotification.css'
const ViewNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const { empid } = useParams();

  const getEmployee = async () => {
    try {
      const response = await axiosInstance(
        `${apiUrl}notifications/employee/${empid}`,{
          headers: {
            "Authorization": sessionStorage.getItem("Authorization"),
          },
         // withCredentials: true
        }
        

      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div className="">
      <div className="container-fluid text-light viewNotification">
        <div className="bg-black-50 notification">
          <h2 className="text-white text-center">Notifications</h2>
          <ul style={{ listStyle: "none" }}>
            {notifications.map((notification) => (
              <div
                role="alert"
                className=" alert  justify-content-space-between align-items-center"
              >
                <div className="w-90 text-wrap">
                  {notification.messageContent}
                </div>
                <hr />

                <div className="">
                  {notification.messageType === "urgent" && (
                    <>
                      <i
                        className="bi bi-exclamation-triangle-fill"
                        style={{ color: "red", fontSize: "1rem" }}
                      ></i>
                    </>
                  )}
                  {notification.messageType === "caution" && (
                    <>
                      <i
                        className="bi bi-exclamation-circle-fill"
                        style={{ color: "orange" }}
                      ></i>
                    </>
                  )}
                  {notification.messageType === "wishes" && (
                    <>
                      <i
                        className="bi bi-heart-fill"
                        style={{ color: "pink" }}
                      ></i>
                    </>
                  )}
                  {notification.messageType === "normal" && (
                    <>
                      <i
                        className="bi bi-chat-fill"
                        style={{ color: "blue" }}
                      ></i>
                    </>
                  )}
                  <br />
                  {/* <strong style={{ marginRight: "5px" }}>Read:</strong>
              {notification.readStatus ? (
                <>
                  <i
                    className="bi bi-check-circle-fill"
                    style={{ color: "green" }}
                  ></i>
                  Yes
                </>
              ) : (
                <>
                  <i
                    className="bi bi-x-circle-fill"
                    style={{ color: "red" }}
                  ></i>
                  No
                </>
              )} */}
                </div>

                <div className="text-wrap text-center">
                  <strong>From:</strong> {notification.fullName} (
                  {notification.email})
                  <br />
                  <strong>Date:</strong>
                  {new Date(notification.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewNotification;
