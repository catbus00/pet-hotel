import { useState, useMemo } from "react";
import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "./Admin";
import Hotel from "./Hotel";
import Dashboard from "./Dashboard";
import PetsView from "./PetsView";
import Profile from "./Profile";
import Landing from "./Landing";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useMemo(() => {
    if (!user) {
      const storedUser = sessionStorage.getItem("authUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    if (!token) {
      const storedToken = sessionStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [user, token]);

  const navigate = useNavigate();
  return (
    <Routes>
      {/* public routes */}
      {["/", "/landing", "/login"].map((path) => (
        <Route
          key={`route-${path}`}
          path={path}
          element={
            <Landing
              setUser={setUser}
              setToken={setToken}
              navigate={navigate}
            />
          }
        />
      ))}
      {/* protected routes */}
      <Route
        element={
          <ProtectedRoute
            user={user}
            token={token}
            setToken={setToken}
            setUser={setUser}
            navigate={navigate}
          />
        }
      >
        <Route path="pets" element={<PetsView token={token} />} />
        <Route path="hotels" element={<Hotel user={user} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard user={user} />} />
        <Route path="admin" element={<Admin user={user} />} />
      </Route>
      {/* fallback route */}
      <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
    </Routes>
  );
}
Root.propTypes = {};

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
