import PropTypes from "prop-types";
import { User } from "./types/User";

function Dashboard({ user }) {
  return (
    <>
      {user ? (
        <p>Welcome {user}!</p>
      ) : (
        <p>
          You are not authorized to view this page. Please log in for access.
        </p>
      )}
    </>
  );
}

Dashboard.propTypes = {
  user: PropTypes.shape(User),
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  navigate: PropTypes.func,
};
export default Dashboard;
