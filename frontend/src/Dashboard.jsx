import { Authenticated } from "./types/Authentication";
import { Box, Grid, Typography } from "@mui/material";

Dashboard.propTypes = {
  ...Authenticated,
};

function Dashboard({ user }) {
  return (
    <>
      {user ? (
        <Box
          sx={{
            marginBottom: "100px",
            marginTop: "100px",
            borderRadius: "30px",
          }}
        >
          <Box>
            <Typography>Hello,</Typography>
            <Typography gutterBottom variant="h3" fontFamily="BeautifulBarbies">
              {user.name}
            </Typography>
            <Typography>Welcome to the Meowtel App.</Typography>
          </Box>
        </Box>
      ) : (
        <Typography>
          You are not authorized to view this page. Please log in for access.
        </Typography>
      )}
    </>
  );
}

export default Dashboard;
