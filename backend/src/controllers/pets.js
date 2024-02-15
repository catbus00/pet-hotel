const Pet = require("../models/Pet");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");
const Hotel = require("../models/Hotel");

const getAllPets = async (req, res) => {
  const pets = await Pet.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ pets, count: pets.length });
};

const getAllHotelsPets = async (req, res) => {
  const hotels = (await Hotel.find({ createdBy: req.user.userId })).map(
    (doc) => doc._id,
  );
  const pets = await Pet.find({
    hotel: { $in: hotels },
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ pets, count: pets.length });
};

const getPet = async (req, res) => {
  const {
    user: { userId },
    params: { id: petId },
  } = req;
  const pet = await Pet.findOne({ _id: petId, createdBy: userId });
  if (!pet) {
    throw new NotFoundError(`No pet with id ${petId}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};

const addPet = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const pet = await Pet.create(req.body);
  res.status(StatusCodes.CREATED).json({ pet });
};

const updatePet = async (req, res) => {
  const {
    body: { name, gender, color, age, likes, dislikes, species, avatar },
    user: { userId },
    params: { id: petId },
  } = req;

  if (
    name === "" ||
    gender === "" ||
    color === "" ||
    age === "" ||
    species === ""
  ) {
    throw new BadRequestError(
      "Name, gender, color, age, and species fields cannot be empty",
    );
  }

  const pet = await Pet.findOneAndUpdate(
    { _id: petId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!pet) {
    throw new NotFoundError(`No pet with id ${petId}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};

const deletePet = async (req, res) => {
  const {
    user: { userId },
    params: { id: petId },
  } = req;

  const pet = await Pet.findOneAndDelete({
    _id: petId,
    createdBy: userId,
  });
  if (!pet) {
    throw new NotFoundError(`No pet with id ${petId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllPets,
  getAllHotelsPets,
  getPet,
  addPet,
  updatePet,
  deletePet,
};
