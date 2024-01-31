const Pet = require("../models/Pet");
const { StatusCodes } = require("http-status-codes");
// const { BadRequestError, NotFoundError } = require("../errors/");

const getAllPets = async (req, res) => {
  console.log(req);
  // const pets = await Pet.find({ createdBy: req.user._id }).sort("createdAt");
  // res.status(StatusCodes.OK).json({ pets, count: pets.length });
  res.status(StatusCodes.OK).json({});
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
  const {
    user: { _id: userId },
    params: { id: petId },
  } = req;
  const pet = await Pet.create({ _id: petId, createdBy: userId });
  res.status(StatusCodes.CREATED).json({ pet });
};

const updatePet = async (req, res) => {
  const {
    body: { name, gender, color, age },
    user: { userId },
    params: { id: petId },
  } = req;

  if (name === "" || gender === "" || color === "" || age === "") {
    throw new BadRequestError(
      "Name, gender, color, and age fields cannot be empty",
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
  getPet,
  addPet,
  updatePet,
  deletePet,
};
