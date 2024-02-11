import Navigation from "./Navigation";
import AppBar from "./AppBar";
import { Authenticated } from "./types/Authentication";

Dashboard.propTypes = {
  ...Authenticated,
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
