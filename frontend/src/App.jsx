import { useState, useEffect } from "react";
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

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("authUser");

    if (storedToken) {
      setToken(storedToken);
      console.log("retrieved token from storage");
    } else {
      console.log("Token not found in session storage");
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("retrieved user from storage");
    } else {
      console.log("User not found in session storage");
    }
  }, [setToken, setUser]);

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
