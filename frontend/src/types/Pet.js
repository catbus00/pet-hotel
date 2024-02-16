import PropTypes from "prop-types";

export const Pet = {
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string),
  dislikes: PropTypes.arrayOf(PropTypes.string),
  species: PropTypes.oneOf(["cat", "dog", "other"]).isRequired,
  hotel: PropTypes.shape({
    _bsontype: PropTypes.oneOf(["ObjectID"]).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  photo: PropTypes.string,
};

export const Pets = {
  pets: PropTypes.arrayOf(PropTypes.shape(Pet)),
  setPets: PropTypes.func,
};
