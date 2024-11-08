import React from "react";
import { Button, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PaySlip = ({ show, closeModal, empId }) => {
  const currentMonthIndex = new Date().getMonth();

  const navigate = useNavigate();

  const lastThreeMonthsIndices = [
    (currentMonthIndex - 1 + 12) % 12,
    (currentMonthIndex - 2 + 12) % 12,
    (currentMonthIndex - 3 + 12) % 12,
  ];

  const lastThreeMonths = lastThreeMonthsIndices.map(
    (index) => monthNames[index]
  );

  // console.log(empId?.empid);
  

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Select Dates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-container">
          <div className="available-payheads">
            <h5 className="text-center text-danger"> </h5>
            <div className="row">
              {lastThreeMonths.map((month, index) => (
                <div key={index} className="mb-2 col">
                  <Card
                    className="text-center bg-light"
                    onClick={() => navigate(`/hrdashboard/payslip/${empId}`, {state:{month}})}
                  >
                    <Card.Body className="fw-bold">{month}</Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaySlip;
