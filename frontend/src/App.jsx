import { useState } from "react";
import PropTypes from "prop-types";
import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Home";
import Admin from "./Admin";
import Auth from "./Auth";
import Hotel from "./Hotel";
import Dashboard from "./Dashboard";
import Pet from "./Pet";
import Profile from "./Profile";
import { User } from "./types/User";
import KOKO from "./Seeds";


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
            token={token}
            setToken={setToken}
            navigate={navigate}
            location={location}
          />
        }
      >
        <Route index element={<Home user={user} />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />} />
        <Route path="pets" element={<Pet user={user} />} />
        <Route path="hotels" element={<Hotel user={user} />} />
        <Route path="profile" element={<Profile user={KOKO} />} />
        <Route
          path="dashboard"
          element={
            <Dashboard
              user={user}
              setUser={setUser}
              setToken={setToken}
              location={location}
            />
          }
        />
        <Route
          path="login"
          element={
            <Auth
              user={user}
              token={token}
              setUser={setUser}
              setToken={setToken}
              location={location}
            />
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
Root.propTypes = {
  user: PropTypes.shape(User),
  token: PropTypes.func,
};
AuthBar.propTypes = {
  user: PropTypes.shape(User),
  setUser: PropTypes.func.isRequired,
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

function AuthBar({ user, setUser, token, navigate, location }) {
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
        <button onClick={() => navigate("/login")}>Sign In</button>
      )}
      <Outlet />
    </>
  );
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
