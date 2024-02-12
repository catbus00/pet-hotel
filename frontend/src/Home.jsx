import Container from "@mui/material/Container";
import { Authenticated } from "./types/Authentication";
import { Secure } from "./types/Secure";
import Landing from "./Landing";
import { Config } from "./types/Config";

Home.propTypes = {
  ...Authenticated,
  ...Secure,
  ...Config,
};

export default function Home({ user, setUser, setToken, navigate, uri }) {
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
              uri={uri}
            />
          )}
        </Container>
      </div>
    </>
  );
}
