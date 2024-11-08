import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SendNotification.css";
const SendNotification = () => {
  const [senderId, setSenderId] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [messageType, setMessageType] = useState("");
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    setSenderId(userId);

    if (userId) {
      getTheEmployees(userId);
    }
  }, []);

  const getTheEmployees = async (userId) => {
    try {
      const res = await axios.get(
        `${apiUrl}users/${userId}/employees`
      );
      setEmployees(res.data);
      // console.log(res);
    } catch (err) {
      setError(err.message);
      setEmployees([]);
    }
  };

  const handleEmployeeSelection = (e, employeeId) => {
    if (e.target.checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(employees.map((employee) => employee.id));
      setSelectAll(true);
    } else {
      setSelectedEmployees([]);
      setSelectAll(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${apiUrl}notifications/send/${senderId}`,
        {
          receivers: selectedEmployees,
          messageContent,
          messageType,
        }
      );
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div className="">
      <div className="card notification-card  bg-black-50 p-4 rounded shadow-sm text-light">
        <h2 className="text-center mb-4">Send Notification</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="text-light">Select Employees:</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="select-all"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <label
                className="form-check-label text-light"
                htmlFor="select-all"
              >
                Select All
              </label>
            </div>
            <div className="form-check text-light text-wrap">
              {employees.map((employee) => (
                <div key={employee.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`employee-${employee.id}`}
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={(e) => handleEmployeeSelection(e, employee.id)}
                  />
                  <label
                    className="form-check-label text-light"
                    htmlFor={`employee-${employee.id}`}
                  >
                    {employee.fullName} - {employee.idNumber}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="text-light">Message:</label>
            <textarea
              className="form-control stretched-textarea"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group mb-4">
            <label className="text-light">Message Type:</label>
            <select
              className="form-control"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              required
            >
              <option value="normal">Normal</option>
              <option value="wishes">Wishes</option>
              <option value="caution">Caution</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Notification
          </button>
        </form>
        {response && <p className="mt-4">{response}</p>}
        {error && <p className="mt-4 text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default SendNotification;
