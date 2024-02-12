import { Authenticated } from "./types/Authentication";
import { Typography } from "@mui/material";

Dashboard.propTypes = {
  ...Authenticated,
};

function Dashboard({ user }) {
  return (
    <>
      {user ? (
        <Typography>Hello, {user.name}! Welcome to Meowtel App.</Typography>
      ) : (
        <Typography>
          You are not authorized to view this page. Please log in for access.
        </Typography>
      )}
    </>
  );
}

export default Dashboard;
