import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./PayheadsModal.css";
import Swal from "sweetalert2";
import { getXsrfToken } from "../../../../App.js";

const PayheadsModal = ({ show, closeModal, empId }) => {
  const [availablePayheads, setAvailablePayheads] = useState([]);
  const [selectedPayheads, setSelectedPayheads] = useState([]);
  const [payheadAmounts, setPayheadAmounts] = useState({});
  const [userdata, setUserdata] = useState([]);
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const addPayhead = (payhead) => {
    setSelectedPayheads([...selectedPayheads, payhead]);
    setAvailablePayheads(
      availablePayheads.filter((p) => p.payHeadId !== payhead.payHeadId)
    );
  };
  const xsrfToken = getXsrfToken();

  const removePayhead = (payhead) => {
    setAvailablePayheads([...availablePayheads, payhead]);
    setSelectedPayheads(
      selectedPayheads.filter((p) => p.payHeadId !== payhead.payHeadId)
    );
    const updatedAmounts = { ...payheadAmounts };
    delete updatedAmounts[payhead.payHeadId];
    setPayheadAmounts(updatedAmounts);
  };

  const handleAmountChange = (payHeadId, amount) => {
    setPayheadAmounts({ ...payheadAmounts, [payHeadId]: amount });
  };

  const handleSubmitDetails = () => {
    const payload = selectedPayheads.map((payhead) => ({
      selectedPayHead: payhead.payHeadName,
      selectedPayHeadType: payhead.payHeadType,
      payHeadAmount: payheadAmounts[payhead.payHeadId] || 0,
    }));

    axios
      .post(`${apiUrl}addPayHeadsToEmployee/employeeData/${empId}`, payload, {
        headers: {
          user_Id: localStorage.getItem("user_id"),
          Authorization: sessionStorage.getItem("Authorization"),
          //"x-xsrf-token":xsrfToken
        },
        withCredentials: true,
      })
      .then((response) => {
        Swal.fire({
          title: "Payheads added successfully",
          text: "Payheads added successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        closeModal();
      })
      .catch((error) => {
        console.error("There was an error adding the pay heads!", error);
        Swal.fire({
          title: error.response?.data?.error,
          text: error.response?.data?.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  
  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    axios
      .get(`${apiUrl}users/payHeads/${storedId}`, {
        headers: {
          Authorization: sessionStorage.getItem("Authorization"),
        },
        withCredentials: true,
      })
      .then((response) => {
        setAvailablePayheads(response.data?.reverse());
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
      });
  }, []);

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Payheads to Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-container">
          <div className="available-payheads">
            <h5 className="text-center text-danger">List of Pay Heads</h5>
            <ul>
              {availablePayheads.map((payhead) => (
                <li key={payhead.payHeadId}>
                  {payhead.payHeadName} {"(" + payhead.payHeadType + ")"}
                  <Button
                    variant="outline-primary"
                    onClick={() => addPayhead(payhead)}
                  >
                    →
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="selected-payheads">
            <h5 className="text-center text-danger">Selected Pay Heads</h5>
            <ul>
              {selectedPayheads.map((payhead) => (
                <li key={payhead.payHeadId}>
                  {payhead.payHeadName} {"(" + payhead.payHeadType + ")"}
                  <Button
                    variant="outline-danger"
                    onClick={() => removePayhead(payhead)}
                  >
                    ←
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="selected-payheads">
            <h5 className="text-center text-danger">Enter Pay Head Amount </h5>
            <ul>
              {selectedPayheads.map((payhead) => (
                <li key={payhead.payHeadIdpayHeadId}>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={payheadAmounts[payhead.payHeadId] || ""}
                    onChange={(e) =>
                      handleAmountChange(payhead.payHeadId, e.target.value)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmitDetails}>
          Add Pay Heads to Employee
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PayheadsModal;
