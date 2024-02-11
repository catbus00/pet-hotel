import Container from "@mui/material/Container";
import { Authenticated } from "./types/Authentication";
import { Secure } from "./types/Secure";
import Landing from "./Landing";

Home.propTypes = {
  ...Authenticated,
  ...Secure,
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
            <Landing
              setUser={setUser}
              setToken={setToken}
              navigate={navigate}
            />
          )}
        </Container>
      </div>
    </>
  );
}
