import env from "react-dotenv";

export const DOMAIN = env?.DOMAIN || "http://localhost";
export const PORT = env?.PORT || 3000;
