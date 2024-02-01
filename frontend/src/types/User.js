import PropTypes from "prop-types";

export const User = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.bool.isRequired,
};
