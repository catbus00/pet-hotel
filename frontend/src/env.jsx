const DOMAIN =
  import.meta.env.VITE_DOMAIN || "https://meowtel-backend.onrender.com";
const PORT = import.meta.env.VITE_PORT || 10000;
export const API = `${DOMAIN}:${PORT}`;
