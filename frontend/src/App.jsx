import { useState } from "react";
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
import HotelsView from "./HotelsView";
import HotelsViewOwned from "./HotelsViewOwned";
import Dashboard from "./Dashboard";
import PetsView from "./PetsView";
import Profile from "./Profile";
import Landing from "./Landing";

const retrieveStoredUser = () => {
  const storedUser = sessionStorage.getItem("authUser");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return undefined;
};

const retrieveStoredToken = () => sessionStorage.getItem("authToken");

function Root() {
  const [user, setUser] = useState(retrieveStoredUser());
  const [token, setToken] = useState(retrieveStoredToken());
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

        <Route path="hotels" element={<HotelsView user={user} />} />
        <Route
          path="hotels/owned"
          element={<HotelsViewOwned token={token} />}
        />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard user={user} />} />
        <Route path="admin" element={<Admin user={user} />} />
      </Route>
      {/* fallback route */}
      <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
    </Routes>
  );
}

const App = () => {
  const router = createBrowserRouter([{ path: "*", element: <Root /> }]);
  return <RouterProvider router={router} />;
};

export default App;
