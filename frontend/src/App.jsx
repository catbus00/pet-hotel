import { useState } from "react";
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
import Hotel from "./Hotel";
import Dashboard from "./Dashboard";
import Pet from "./Pet";
import Profile from "./Profile";
import Landing from "./Landing";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Routes>
      <Route
        index
        element={
          <Landing setUser={setUser} setToken={setToken} navigate={navigate} />
        }
      />
      <Route element={<ProtectedRoute isAllowed={!!user} />} />
      <Route path="pets" element={<Pet user={user} />} />
      <Route path="hotels" element={<Hotel user={user} />} />
      <Route path="profile" element={<Profile />} />
      <Route
        path="dashboard"
        element={
          <Dashboard user={user} setToken={setToken} setUser={setUser} navigate={navigate} />
        }
      />
      <Route
        path="login"
        element={
          <Landing setUser={setUser} setToken={setToken} navigate={navigate} />
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
    </Routes>
  );
}
Root.propTypes = {};

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
