import Container from "@mui/material/Container";
import { User } from "./types/User";
import PropTypes from "prop-types";
import Landing from "./Landing";

Home.propTypes = {
  user: PropTypes.shape(User),
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default function Home({ user, setUser, setToken, navigate }) {
  return (
    <>
      <div>
        <Container maxWidth="sm">
          {user?.status === "owner" || user?.status === "customer" ? (
            // TODO: create or modularize Profile component
            <></>
          ) : (
            <Landing setUser={setUser} setToken={setToken} navigate={navigate} />
          )}
        </Container>
      </div>
    </>
  );
}
