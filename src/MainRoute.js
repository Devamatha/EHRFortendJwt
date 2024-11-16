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
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<Aboutus />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Sidenav" element={<Header />} />
        
        <Route path="/hrdashboard" element={<PrivateRoute element={HrDashboard} requiredRole="ROLE_HR" />} >
          <Route path="/hrdashboard/addJobDetails" element={<AddJobDetails />} />
          <Route path="/hrdashboard/EditEmployee/:id" element={<EditEmployee />} />
          <Route path="/hrdashboard/AddHoliday" element={<AddHoliday />} />
          <Route path="/hrdashboard/listJobDetails" element={<TableData />} />
          <Route path="/hrdashboard/HolidayTableData" element={<HolidayTableData />} />
          <Route path="/hrdashboard/editHoliday/:jobId" element={<HoliDayTableDataEdit />} />
          <Route path="/hrdashboard/editPayHead/:payId" element={<PayHeadEdit />} />
          <Route path="/hrdashboard/resumeUpload" element={<ResumeUpload />} />
          <Route path="/hrdashboard/AttedenceEmployee" element={<AttedenceEmployee />} />
          <Route path="/hrdashboard/LeaveApproval" element={<LeaveApprovalData />} />
          <Route path="/hrdashboard/editJobDetails/:jobId" element={<EditJobDetails />} />
          <Route path="/hrdashboard/AddPayHead" element={<AddPayHead />} />
          <Route path="/hrdashboard/PayHeadList" element={<PayHeadList />} />
          <Route path="/hrdashboard/AddEmployee" element={<AddEmployee />} />
          <Route path="/hrdashboard/EmployeeList" element={<EmployeeList />} />
          <Route path="/hrdashboard/SendNotification" element={<SendNotification />} />
          <Route path="/hrdashboard/PersonalInformationTable" element={<PersonalInformationTable />} />
          <Route path="/hrdashboard/payslip/:empid" element={<EmployeeDetails />} />
          <Route path="/hrdashboard/example" element={<Example />} />

          <Route path="/hrdashboard/UpgradePlan" element={<UpgradePlan />} />
        </Route>
        
        <Route path="/AdminDashboard" element={<PrivateRoute element={AdminDashboard} requiredRole="ROLE_ADMIN" />}>
          <Route path="/AdminDashboard/usersList" element={<UsersList />} />
          <Route path="/AdminDashboard/Home" element={<Home />} />
          <Route path="/AdminDashboard/addPackage" element={<AddPackage />} />
          <Route path="/AdminDashboard/PricingContainer" element={<PricingContainer />} /> 

          <Route path="/AdminDashboard/Signup" element={<SignUp />} />

                 </Route>
        
        <Route path="/interviewlogin" element={<InterviewLogin />} />
        <Route path="/ViewNotification/:empid" element={<ViewNotification />} />
        <Route path="/exam/:emailid" element={<Exam />} />

        <Route path="/EmployeeDashboard" element={<PrivateRoute element={EmployeeDashboard} requiredRole="ROLE_EMPLOYEE" />}>
          <Route path="/EmployeeDashboard/createAttendence" element={<AttendanceForm />} />
          <Route path="/EmployeeDashboard/attendances" element={<AttendenceList />} />
          <Route path="/EmployeeDashboard/LeaveApprovalForm" element={<LeaveApproval />} />
          <Route path="/EmployeeDashboard/LeaveApprovalList" element={<LeaveApprovalList />} />
          <Route path="/EmployeeDashboard/ViewNotification/:empid" element={<ViewNotification />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRoute;
