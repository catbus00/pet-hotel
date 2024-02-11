import PropTypes from "prop-types";
import { User } from "./types/User";
import Navigation from "./Navigation";
import AppBar from "./AppBar";

Dashboard.propTypes = {
  user: PropTypes.shape(User),
};

function Dashboard({ user }) {
  return (
    <>
      {user !== null && user !== undefined && <AppBar />}
      {user ? (
        <p>Hello, {user}! Welcome to Meowtel App.</p>
      ) : (
        <p>
          You are not authorized to view this page. Please log in for access.
        </p>
      )}
      {user !== null && user !== undefined && <Navigation />}
    </>
  );
}

export default Dashboard;
