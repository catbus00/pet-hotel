import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { User as userType } from "./Types";

const ProtectedRoute = ({
  user,
  redirectPath = "/landing",
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  user: PropTypes.shape(userType),
  redirectPath: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
};

export default ProtectedRoute;
