import Container from "@mui/material/Container";
import Profile from "./Profile";
import { User } from "./Types";
import PropTypes from "prop-types";

Home.propTypes = { user: PropTypes.shape(User) };

export default function Home({ user }) {
  console.log("log in Home");
  console.log(user);
  return (
    <>
      <div>
        <Container maxWidth="sm">
          {user?.status === "owner" || user?.status === "customer" ? (
            <Profile {...user} />
          ) : (
            <div>Please login</div>
          )}
        </Container>
      </div>
    </>
  );
}
