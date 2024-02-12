import { Authenticated } from "./types/Authentication";

Dashboard.propTypes = {
  ...Authenticated,
};

function Dashboard({ user }) {
  return (
    <>
      {user ? (
        <p>Hello, {user.name}! Welcome to Meowtel App.</p>
      ) : (
        <p>
          You are not authorized to view this page. Please log in for access.
        </p>
      )}
    </>
  );
}

export default Dashboard;
