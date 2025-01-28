import React from "react";
import { Routes, Route, BrowserRouter,Link} from "react-router-dom";
import Home from "./Screens/Home/Home";
import LoginPage from "./Screens/Login/LoginPage";
import TableData from "./Components/Table/TableData";
import HrDashboard from "./Components/HrDashboard/HrDashboard";
import AdminDashboard from "./adminDashboard/AdminDashboard";
import Header from "./Screens/Header/Header";
import Exam from "./Interview Panel/Interview Panel/Exam";
import InterviewLogin from "./Interview Panel/Interview Panel/InterviewLogin";
import ResumeUpload from "./candidate/candidate/ResumeUpload";
import UsersList from "./adminDashboard/UsersList/UsersList";
import AddPackage from "./Screens/AddPackage/AddPackage";
import PersonalInformationTable from "./PersonalInformationTable/PersonalInformationTable";
import AddHoliday from "./Components/HrDashboard/AddHoliday/AddHoliday";
import HolidayTableData from "./Components/HrDashboard/HolidayTable/HolidayTableData";
import AddJobDetails from "./Components/HrDashboard/AddJobDetails/AddJobDetails";
import EditJobDetails from "./EditJobDetails/EditJobDetails/EditJobDetails";
import AddPayHead from "./Components/HrDashboard/PayHead/AddPayHead";
import PayHeadList from "./Components/HrDashboard/PayHead/PayHeadList/PayHeadList";
import AddEmployee from "./Components/HrDashboard/AddEmployee/AddEmployee";
import EmployeeList from "./Components/HrDashboard/EmployeeList/EmployeeList";
import SendNotification from "./Screens/Notifications/Notifications/SendNotification";
import ViewNotification from "./Screens/Notifications/Notifications/ViewNotification";
import EmployeeDashboard from "./Components/EmployeeDashboard/EmployeeDashboard";
import AttendanceForm from "./Components/EmployeeDashboard/Attendence/CreateAttendence";
import AttendenceList from "./Components/EmployeeDashboard/AttendenceList/AttendenceList";
import LeaveApproval from "./Components/EmployeeDashboard/LeaveApproval/LeaveApproval";
import LeaveApprovalList from "./Components/EmployeeDashboard/LeaveApprovalList/LeaveApprovalList";
import HoliDayTableDataEdit from "./Components/HrDashboard/HolidayTable/HoliDayTableDataEdit";
import PayHeadEdit from "./Components/HrDashboard/PayHead/PayHeadList/PayHeadEdit";
import Login from "./UIcomponents/authentication/Login";
import ResetPassword from "./UIcomponents/authentication/ResetPassword";
import SignUp from "./UIcomponents/authentication/SignUp";
import HomePage from "./UIcomponents/homepage/HomePage";
import Aboutus from "./UIcomponents/aboutus/Aboutus";
import Pricing from "./UIcomponents/pricing/Pricing";
import Contactus from "./UIcomponents/contactus/Contactus";
import AttedenceEmployee from "./Components/HrDashboard/AttedenceViewEmployee/AttedenceEmployee";
import LeaveApprovalData from "./Components/HrDashboard/LeaveApprovalListEmployee/LeaveApprovalData";
import EditEmployee from "./Components/HrDashboard/EditEmployee/EditEmployee/EditEmployee";
import EmployeeDetails from "./Components/HrDashboard/EmployeeList/PaySlip/EmployeeDetails";
import PricingContainer from "./UIcomponents/pricing/PricingContainer";
import Example from "./Components/HrDashboard/PayHead/Example";
import UpgradePlan from "./UIcomponents/upgradeplan/UpgradePlan";
import PrivateRoute from './PrivateRoute';

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route index element={<HomePage />} />
        <Route path="/About" element={<Aboutus />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/Home" element={<Home />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/Sidenav" element={<Header />} />
        <Route path="/interviewlogin" element={<InterviewLogin />} />
        <Route path="/ViewNotification/:empid" element={<ViewNotification />} />
        <Route path="/exam/:emailid" element={<Exam />} />

        
        <Route path="/hrdashboard" element={<PrivateRoute element={HrDashboard} requiredRole="ROLE_HR" />} >
          <Route path="/hrdashboard/addJobDetails"  element={<PrivateRoute element={AddJobDetails} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/EditEmployee/:id"  element={<PrivateRoute element={EditEmployee} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/AddHoliday"  element={<PrivateRoute element={AddHoliday} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/listJobDetails"  element={<PrivateRoute element={TableData} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/HolidayTableData"     element={<PrivateRoute element={HolidayTableData} requiredRole="ROLE_HR" />}/>
          <Route path="/hrdashboard/editHoliday/:jobId"  element={<PrivateRoute element={HoliDayTableDataEdit} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/editPayHead/:payId"  element={<PrivateRoute element={PayHeadEdit} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/resumeUpload"  element={<PrivateRoute element={ResumeUpload} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/AttedenceEmployee"  element={<PrivateRoute element={AttedenceEmployee} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/LeaveApproval" element={<PrivateRoute element={LeaveApprovalData} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/editJobDetails/:jobId"  element={<PrivateRoute element={EditJobDetails} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/AddPayHead"  element={<PrivateRoute element={AddPayHead} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/PayHeadList"  element={<PrivateRoute element={PayHeadList} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/AddEmployee"  element={<PrivateRoute element={AddEmployee} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/EmployeeList"  element={<PrivateRoute element={EmployeeList} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/SendNotification"  element={<PrivateRoute element={SendNotification} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/PersonalInformationTable"  element={<PrivateRoute element={PersonalInformationTable} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/payslip/:empid"  element={<PrivateRoute element={EmployeeDetails} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/example"  element={<PrivateRoute element={Example} requiredRole="ROLE_HR" />} />
          <Route path="/hrdashboard/UpgradePlan"  element={<PrivateRoute element={UpgradePlan} requiredRole="ROLE_HR" />} />
        </Route>
        
        <Route path="/AdminDashboard" element={<PrivateRoute element={AdminDashboard} requiredRole="ROLE_ADMIN" />}>
          <Route path="/AdminDashboard/usersList"  element={<PrivateRoute element={UsersList} requiredRole="ROLE_ADMIN" />} />
          <Route path="/AdminDashboard/Home"  element={<PrivateRoute element={Home} requiredRole="ROLE_ADMIN" />} />
          <Route path="/AdminDashboard/addPackage"  element={<PrivateRoute element={AddPackage} requiredRole="ROLE_ADMIN" />} />
          <Route path="/AdminDashboard/PricingContainer"  element={<PrivateRoute element={PricingContainer} requiredRole="ROLE_ADMIN" />} /> 
          <Route path="/AdminDashboard/Signup"  element={<PrivateRoute element={SignUp} requiredRole="ROLE_ADMIN" />} />
        </Route>
        
      
        <Route path="/EmployeeDashboard" element={<PrivateRoute element={EmployeeDashboard} requiredRole="ROLE_EMPLOYEE" />}>
          <Route path="/EmployeeDashboard/createAttendence"  element={<PrivateRoute element={AttendanceForm} requiredRole="ROLE_EMPLOYEE" />} />
          <Route path="/EmployeeDashboard/attendances" element={<PrivateRoute element={AttendenceList} requiredRole="ROLE_EMPLOYEE" />} />
          <Route path="/EmployeeDashboard/LeaveApprovalForm"  element={<PrivateRoute element={LeaveApproval} requiredRole="ROLE_EMPLOYEE" />} />
          <Route path="/EmployeeDashboard/LeaveApprovalList"  element={<PrivateRoute element={LeaveApprovalList} requiredRole="ROLE_EMPLOYEE" />} />
          <Route path="/EmployeeDashboard/ViewNotification/:empid"  element={<PrivateRoute element={ViewNotification} requiredRole="ROLE_EMPLOYEE" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRoute;

