const DOMAIN =
  import.meta.env.VITE_DOMAIN || "https://meowtel-backend.onrender.com";
const PORT = import.meta.env.VITE_PORT
  ? parseInt(import.meta.env.VITE_PORT)
  : undefined;
export const API =
  PORT && typeof PORT === "number" ? `${DOMAIN}:${PORT}` : DOMAIN;
