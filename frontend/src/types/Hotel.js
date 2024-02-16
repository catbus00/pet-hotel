import PropTypes from "prop-types";

export const Hotel = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  year: PropTypes.string,
};

export const Hotels = {
  hotels: PropTypes.arrayOf(PropTypes.shape(Hotel)),
  setHotels: PropTypes.func,
};
