import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    {/* Public */}
    <Link to="/landing">Landing</Link>
    <Link to="/login">Login</Link>
    <Link to="/login">Register</Link>
    {/* Protected */}
    <Link to="/home">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);
