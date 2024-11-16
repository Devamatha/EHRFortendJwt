import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";

const EmployeeDetails = () => {
  const { empid } = useParams();
  const location = useLocation();

  const user_id = localStorage.getItem("user_id");
  const { month } = location.state || {};

  const [employeedata, setEmployeeData] = useState({});
  const [userdata, setUserdata] = useState({});
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const employeeGet = () => {
    axios 
      .get(`${apiUrl}employees/${empid}`,
        {
          headers: {
            "Authorization": sessionStorage.getItem('Authorization')
          },
          observe: 'response',
          credentials: 'include',
             withCredentials: true,
        }

      )
      .then((reponse) => {
        setEmployeeData(reponse.data);
        // console.log(reponse.data);
        if(reponse.data.id){
        getHrDetails(reponse.data.id)

        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const getHrDetails = (id) => {
    // const user_id = localStorage.getItem("user_id");
    axios
      .get(`${apiUrl}employees/addPayHeaddetails/${id}`,
        {
          headers: {
            "Authorization": sessionStorage.getItem('Authorization'),
            //"x-xsrf-token":xsrfToken``
          },  
          observe: 'response',
          credentials: 'include',
             withCredentials: true,
        }
      )
      .then((response) => {
        setUserdata(response.data);
        // console.log(response.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    employeeGet(empid);
   
  }, [empid]);

  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.width;
    const pdfHeight = pdf.internal.pageSize.height;

    const logoX = 20;
    const logoY = 20;
    const logoWidth = 100;
    const logoHeight = 40;

    const textX = pdfWidth - 200;
    const textY = 20;

    const logoImg = `data:image/jpeg;base64,${userdata?.logo}`;

    // Ensure the image is correctly loaded before adding it to the PDF
    if (userdata?.logo) {
      pdf.addImage(logoImg, "JPEG", logoX, logoY, logoWidth, logoHeight);
    }

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    if (userdata?.companyName) pdf.text(userdata?.companyName, textX, textY);
    pdf.setFontSize(12);
    if (userdata?.authorizedCompanyName)
      pdf.text(userdata?.authorizedCompanyName, textX, textY + 20);
    pdf.setFontSize(6);
    if (userdata?.address) pdf.text(userdata.address, textX, textY + 40);

    pdf.setFontSize(20);
    const text = `Salary Slip: ${month}`;
    const textWidth = pdf.getTextWidth(text);
    const xCoordinate = (pdfWidth - textWidth) / 2;
    pdf.text(text, xCoordinate, 50);

    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(1);
    pdf.line(
      20,
      logoY + logoHeight + 10,
      pdfWidth - 20,
      logoY + logoHeight + 10
    );

    const earnings =userdata.payHeads.filter(
      (item) => item.selectedPayHeadType === "Earning"
    );

    const deductions = userdata.payHeads.filter(
      (item) => item.selectedPayHeadType === "Deductions"
    );

    autoTable(pdf, {
      startY: 100,
      head: [["Description", "Value", "Description", "Value"]],
      body: [
        [
          "Employee Code",
          employeedata?.empCode,
          "Bank Name",
          employeedata?.bankName || "N/A",
        ],
        [
          "Employee Name",
          userdata?.employeeFullName,
          "Bank Account",
          employeedata?.bankAccountNo || "N/A",
        ],
        [
          "Designation",
          employeedata?.designation || "N/A",
          "IFSC Code",
          employeedata?.ifsccode || "N/A",
        ],
        [
          "Gender",
          employeedata?.gender || "N/A",
          "PAN",
          employeedata?.panNo || "N/A",
        ],
        [
          "Location",
          employeedata?.address,
          "PF Account",
          employeedata?.pfAccountNo || "N/A",
        ],
        [
          "Department",
          employeedata?.department || "N/A",
          "Payable",
          employeedata?.totalDays || "N/A",
        ],
        [
          "Date of Joining",
          employeedata.joiningDate,
          "Taken/Remaining Leave",
          "23/23",
        ],
      ],
      theme: "striped",
      margin: { top: 100 },
    });

    const earningsRows = earnings.map((item) => [
      item.selectedPayHead,
      "",
      "",
      item.payHeadAmount,
    ]);

    const deductionsRows = deductions.map((item) => [
      item.selectedPayHead,
      "",
      "",
      item.payHeadAmount,
    ]);

    const totalEarnings = earnings.reduce(
      (acc, item) => acc + item.payHeadAmount,
      0
    );
    const totalDeductions = deductions.reduce(
      (acc, item) => acc + item.payHeadAmount,
      0
    );

    earningsRows.push(["Total Earnings", "", "", totalEarnings]);
    deductionsRows.push(["Total Deductions", "", "", totalDeductions]);

    const maxLength = Math.max(earningsRows.length, deductionsRows.length);
    const combinedRows = [];

    for (let i = 0; i < maxLength; i++) {
      combinedRows.push([
        ...(earningsRows[i] || ["", "", "", ""]),
        ...(deductionsRows[i] || ["", "", "", ""]),
      ]);
    }

    autoTable(pdf, {
      startY: pdf.lastAutoTable.finalY + 20,
      head: [
        [
          "Earnings",
          "",
          "",
          "Amount (Rs.)",
          "Deductions",
          "",
          "",
          "Amount (Rs.)",
        ],
      ],
      body: combinedRows,
      theme: "striped",
    });

    const netSalary = totalEarnings - totalDeductions;
    pdf.setFontSize(12);
    pdf.setFont("Roboto Serif");
    pdf.text(
      `Net Salary Payable: ${netSalary}`,
      20,
      pdf.lastAutoTable.finalY + 40
    );

    pdf.save("payslip.pdf");
  };

  useEffect(() => {
    if (userdata) {
      calculateTotals();
    }
  }, [userdata]);

  const calculateTotals = () => {
    if (
      userdata.payHeads &&
      Array.isArray(userdata.payHeads)
    ) {
      const earnings = userdata.payHeads
        .filter((item) => item.selectedPayHeadType === "Earning")
        .reduce((acc, item) => acc + item.payHeadAmount, 0);

      const deductions = userdata.payHeads
        .filter((item) => item.selectedPayHeadType === "Deductions")
        .reduce((acc, item) => acc + item.payHeadAmount, 0);

      setTotalEarnings(earnings);
      setTotalDeductions(deductions);
    }
  };

  // useEffect(() => {
  //   if (employeedata.addPayHeadsToEmployee) {
  //     calculateTotals();
  //   }
  // }, [employeedata]);

  // <div className="ml-[25%] w-[75%] md:ml-[31%] md:w-[69%] lg:ml-[27%] lg:w-[73%]">

  return (
      <div className="container-fluid totalPage mt-[10%] h-[90%]">
        <div className="container bg-black-50 p-4 rounded shadow-sm text-wrap">
          <div className="row">
            <div className=" col  text-center text-white mb-3">
              <h1 className="fw-bolder ">{userdata?.companyName}</h1>
              {/* <h6 className="text-right">{userdata?.authorizedCompanyName}</h6> */}
              <h6>{userdata?.address}</h6>
            </div>
          </div>

          <p className="text-center fw-bold text-light ">
            <span className="fw-bold">Salary Slip :</span> {month}
          </p>
          <div className="row mt-4 text-light">
            <div className="col-md-6 col-sm-6 text-center mb-3">
              <table className="col  text-light table-bordered text-center">
                <tbody>
                  <tr>
                    <td>Employee Code</td>
                    <td>{employeedata?.empCode}</td>
                  </tr>

                  <tr>
                    <td>Employee Name</td>
                    <td>{userdata?.employeeFullName
                    }</td>
                  </tr>

                  <tr>
                    <td>Designation</td>
                    <td>{employeedata?.designation}</td>
                  </tr>

                  <tr>
                    {" "}
                    <td>Bank Name</td>
                    <td>{employeedata?.country}</td>
                  </tr>

                  <tr>
                    <td>Department</td>
                    <td>{employeedata?.department}</td>
                  </tr>
                  <tr>
                    {" "}
                    <td>Gender</td>
                    <td>{employeedata?.gender}</td>
                  </tr>
                  <tr>
                    <td>Date of Joining</td>
                    <td>{employeedata.joiningDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className="col-md-6 col-sm-6 text-center mb-3">
              <table className="col  text-light table-bordered text-center">
                <tbody>
                  <tr>
                    <td>Bank Account</td>
                    <td>{employeedata?.bankAccountNo}</td>
                  </tr>
                  <tr>
                    <td>IFSC Code</td>
                    <td>{employeedata?.ifsccode}</td>
                  </tr>

                  <tr>
                    <td>PAN</td>
                    <td>{employeedata?.panNo}</td>
                  </tr>
                  <tr>
                    <td>PF Account</td>
                    <td>{employeedata?.pfAccountNo}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>{employeedata?.address}</td>
                  </tr>

                  <tr>
                    <td>Payable Days</td>
                    <td>
                      <input /> 
                    </td>
                  </tr>

                  <tr>
                    <td>Taken/Remaining Leave  Days</td>
                    <td>
                      <input  />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
             <div className="col-md-6 col-sm-6 text-center mb-3 max-w-[75%] overflow-auto ">
              <table className="col  text-light table-bordered text-center ">
              <tbody>
                  <tr>
                    <td>Bank Account</td>
                    <td>{employeedata?.bankAccountNo}</td>
                  </tr>
                  <tr>
                    <td>IFSC Code</td>
                    <td>{employeedata?.ifsccode}</td>
                  </tr>

                  <tr>
                    <td>PAN</td>
                    <td>{employeedata?.panNo}</td>
                  </tr>
                  <tr>
                    <td>PF Account</td>
                    <td>
                      {employeedata?.pfAccountNo}
                     
                      </td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>
                      {employeedata?.address}

                    </td>
                  </tr>

                  <tr>
                    <td>Payable Days</td>
                    <td>
                      <input className="formControl"/> 
                    </td>
                  </tr>

                  <tr>
                    <td>Taken/Remaining Leave  Days</td>
                    <td>
                      <input  className="formControl"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      
          <div className="row mt-4 text-light">
            <div className="col-md-6 text-center mb-3">
              <h3>Earnings</h3>
              <table className="col table-bordered">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata?.payHeads?.map((element) => {
                    if (
                      element.selectedPayHeadType
                        .toLowerCase()
                        .includes("earning")
                    ) {
                      return (
                        <tr key={element.id}>
                          <td>{element.selectedPayHead}</td>
                          <td>{element.payHeadAmount}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-md-6 text-center">
              <h3>Deductions</h3>
              <table className=" col table-bordered">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata?.payHeads?.map((element) => {
                    if (
                      element.selectedPayHeadType
                        .toLowerCase()
                        .includes("deductions")
                    ) {
                      return (
                        <tr key={element.id}>
                          <td>{element.selectedPayHead}</td>
                          <td>{element.payHeadAmount}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row text-light mt-3">
            <div className="col-6 text-end">
              <strong>Total Earnings:</strong> {totalEarnings}
            </div>
            <div className="col-6">
              <strong>Total Deductions:</strong> {totalDeductions}
            </div>
          </div>

          <div className="row  mt-4 text-light">
          <div className="col-6 col-md-6 col-sm-6 text-center">
            <h5>NetSalary: {totalEarnings - totalDeductions}</h5>
            </div>
            <div className="col-6 col-md-6 col-sm-6 text-center">
            <button className="btn button" onClick={generatePDF}>
               Download
            </button>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default EmployeeDetails;
