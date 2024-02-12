import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "./AppBar";
import { User } from "./types/User";
import { Authenticator } from "./types/Authentication";
import { Navigation as NavigationProps } from "./types/Navigation";
import Navigation from "./Navigation";
import { Config } from "./types/Config";

function ProtectedRoute({ user, token, setUser, setToken, navigate, uri }) {
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AppBar
        uri={uri}
        setUser={setUser}
        setToken={setToken}
        navigate={navigate}
      />
      <Outlet />
      <Navigation />
    </>
  );
}

ProtectedRoute.propTypes = {
  ...Authenticator,
  ...NavigationProps,
  user: PropTypes.shape(User),
  token: PropTypes.string,
  ...Config,
};

export default ProtectedRoute;
