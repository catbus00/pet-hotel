import PropTypes from "prop-types";

export const User = {
  name: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  photo: PropTypes.string,
  status: PropTypes.oneOf(["anonymous", "customer", "owner"]),
  likes: PropTypes.arrayOf(PropTypes.string),
  dislikes: PropTypes.arrayOf(PropTypes.string),
  specie: PropTypes.oneOf(["human", "cat", "dog"]),
  gender: PropTypes.oneOf(["male", "female"]),
};
