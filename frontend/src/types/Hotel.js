import PropTypes from "prop-types";

export const Hotel = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  year: PropTypes.string,
});
