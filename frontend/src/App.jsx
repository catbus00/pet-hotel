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
import Dashboard from "./Dashboard";
import { User } from "./Types";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Routes>
      <Route
        element={
          <AuthBar
            user={user}
            setUser={setUser}
            navigate={navigate}
            location={location}
          />
        }
      >
        <Route index element={<Home user={user} />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />} />
        <Route path="dashboard" element={<Dashboard user={user} />} />
        <Route
          path="login"
          element={<Auth setUser={setUser} location={location} />}
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
Root.propTypes = { user: PropTypes.shape(User) };
AuthBar.propTypes = {
  user: PropTypes.shape(User),
  setUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

function AuthBar({ user, setUser, navigate, location }) {
  console.log(location);
  return (
    <>
      {location.pathname === "/login" || location.pathname === "/register" ? (
        ""
      ) : user ? (
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
