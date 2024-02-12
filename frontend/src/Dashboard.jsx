import Navigation from "./Navigation";
import { useEffect } from "react";
import AppBar from "./AppBar";
import { Authenticated, Authenticator } from "./types/Authentication";
import { Navigation as NavigationProps } from "./types/Navigation";

Dashboard.propTypes = {
  ...Authenticated,
  ...Authenticator,
  ...NavigationProps,
};

function Dashboard({ user, setUser, setToken, navigate }) {
  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("authUser");

    if (storedToken) {
      setToken(storedToken);
    } else {
      console.log("Token not found in session storage");
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log("User not found in session storage");
    }
  }, [setToken, setUser]);
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
