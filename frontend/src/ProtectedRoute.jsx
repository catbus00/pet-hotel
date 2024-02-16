import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "./AppBar";
import { User } from "./types/User";
import { Authenticator } from "./types/Authentication";
import { Navigation as NavigationProps } from "./types/Navigation";
import Navigation from "./Navigation";
import { Hotels } from "./types/Hotel";

function ProtectedRoute({
  user,
  token,
  setUser,
  setToken,
  navigate,
  hotels,
  setHotels,
}) {
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AppBar setUser={setUser} setToken={setToken} navigate={navigate} />
      <Outlet />
      <Navigation
        user={user}
        token={token}
        hotels={hotels}
        setHotels={setHotels}
      />
    </>
  );
}

ProtectedRoute.propTypes = {
  ...Authenticator,
  ...NavigationProps,
  user: PropTypes.shape(User),
  token: PropTypes.string,
  ...Hotels,
};

export default ProtectedRoute;
