import { useState } from "react";
import PropTypes from "prop-types";
import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./Admin";
import Auth from "./Auth";
import Hotel from "./Hotel";
import Dashboard from "./Dashboard";
import Pet from "./Pet";
import Profile from "./Profile";
import Landing from "./Landing";
import { Secure } from "./types/Secure";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Routes>
      <Route
        element={
          <AuthBar
            user={user}
            setUser={setUser}
            setToken={setToken}
            token={token}
            navigate={navigate}
            location={location}
          />
        }
      >
        <Route
          index
          element={
            <Landing
              setUser={setUser}
              setToken={setToken}
              navigate={navigate}
            />
          }
        />
        <Route element={<ProtectedRoute isAllowed={!!user} />} />
        <Route path="pets" element={<Pet user={user} />} />
        <Route path="hotels" element={<Hotel user={user} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard user={user} />} />
        <Route
          path="login"
          element={
            <Auth setUser={setUser} setToken={setToken} navigate={navigate} />
          }
        />

        <Route
          path="admin"
          element={
            <ProtectedRoute
              redirectPath="/admin"
              isAllowed={!!user && user.role === "true"}
            >
              <Admin user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
      </Route>
    </Routes>
  );
}
Root.propTypes = {};
AuthBar.propTypes = {
  ...Secure,
  token: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

function AuthBar({ user, setUser, setToken, token, navigate, location }) {
  const notOnLoginOrRegisterAlready =
    location.pathname !== "/login" || location.pathname !== "/register";
  const canSignOut = user && token && notOnLoginOrRegisterAlready;
  const canSignIn = !user && !token && notOnLoginOrRegisterAlready;
  return (
    <>
      {!canSignIn && !canSignOut ? (
        ""
      ) : canSignOut ? (
        <button onClick={() => setUser(null)}>Sign Out</button>
      ) : (
        <Landing setUser={setUser} setToken={setToken} navigate={navigate} />
      )}
    </>
  );
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
