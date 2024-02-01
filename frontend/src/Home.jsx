import Container from "@mui/material/Container";
import Profile from "./Profile";
import { User } from "./Types";
import PropTypes from "prop-types";
import Landing from "./Landing";

Home.propTypes = { user: PropTypes.shape(User) };

export default function Home({ user }) {
  return (
    <>
      <div>
        <Container maxWidth="sm">
          {user?.status === "owner" || user?.status === "customer" ? (
            <Profile {...user} />
          ) : (
            <Landing />
          )}
        </Container>
      </div>
    </>
  );
}
