import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component,requiredRole , ...rest }) => {
  const fullName = localStorage.getItem('fullName'); 
const role = localStorage.getItem('role');
if(!fullName && !role){
    return <Navigate to="/login" />
}


if (requiredRole && role !== requiredRole) {
    switch (role) {
      case 'admin':
        return <Navigate to="/AdminDashboard" />;
      case 'employee':
        return <Navigate to="/EmployeeDashboard" />;
      case 'USER':
        return <Navigate to="/hrdashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }
 // return fullName ? <Component {...rest} /> : <Navigate to="/login" />;

  return <Component {...rest} />;
};

export default PrivateRoute;
