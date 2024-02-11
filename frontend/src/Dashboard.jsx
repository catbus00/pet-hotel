import Navigation from "./Navigation";
import AppBar from "./AppBar";
import { Authenticated, Authenticator } from "./types/Authentication";
import { Navigation as NavigationProps } from "./types/Navigation";

Dashboard.propTypes = {
  ...Authenticated,
  ...Authenticator,
  ...NavigationProps,
};

function Dashboard({ user, setUser, setToken, navigate }) {
  return (
    <>
      {user && (
        <AppBar setToken={setToken} setUser={setUser} navigate={navigate} />
      )}
      {user ? (
        <p>Hello, {user.name}! Welcome to Meowtel App.</p>
      ) : (
        <p>
          You are not authorized to view this page. Please log in for access.
        </p>
      )}
      {user && <Navigation />}
    </>
  );
}

export default Dashboard;
