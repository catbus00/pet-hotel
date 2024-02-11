import PropTypes from "prop-types";
import { User } from "./User";

export const Authenticator = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export const Authenticated = {
  user: PropTypes.shape(User),
};
