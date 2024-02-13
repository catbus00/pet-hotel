import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "./AppBar";
import { User } from "./types/User";
import { Authenticator } from "./types/Authentication";
import { Navigation as NavigationProps } from "./types/Navigation";
import Navigation from "./Navigation";

function ProtectedRoute({ user, token, setUser, setToken, navigate }) {
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AppBar
        setUser={setUser}
        setToken={setToken}
        navigate={navigate}
      />
      <Outlet />
      <Navigation user={user} />
    </>
  );
}

ProtectedRoute.propTypes = {
  ...Authenticator,
  ...NavigationProps,
  user: PropTypes.shape(User),
  token: PropTypes.string,
};

export default ProtectedRoute;
