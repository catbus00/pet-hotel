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
import HotelsView from "./HotelsView";
import HotelsViewOwned from "./HotelsViewOwned";
import Dashboard from "./Dashboard";
import PetsView from "./PetsView";
import PetsViewOwned from "./PetsViewOwned";
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
  const [hotels, setHotels] = useState([]);
  const [pets, setPets] = useState([]);
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
            setHotels={setHotels}
            setPets={setPets}
            hotels={hotels}
          />
        }
      >
        <Route
          path="pets/owned"
          element={
            <PetsViewOwned
              setPets={setPets}
              pets={pets}
              token={token}
              user={user}
            />
          }
        />
        <Route
          path="pets/"
          element={<PetsView token={token} setPets={setPets} pets={pets} />}
        />
        <Route
          path="hotels"
          element={
            <HotelsView setHotels={setHotels} hotels={hotels} user={user} />
          }
        />
        <Route
          path="hotels/owned"
          element={
            <HotelsViewOwned
              setHotels={setHotels}
              hotels={hotels}
              token={token}
              user={user}
            />
          }
        />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard user={user} />} />
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
