import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ allowedRoles }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const userRole = localStorage.getItem('getRole');

  // Check if the user is logged in and has an allowed role
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/no-access" />; // Redirect to a "No Access" page if the role isn't allowed
  }

  return <Outlet />;
};

export default PrivateRoutes;
