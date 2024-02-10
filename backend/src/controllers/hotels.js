const Hotel = require("../models/Hotel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/");

const getAllHotels = async (req, res) => {
  const hotels = await Hotel.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ hotels, count: hotels.length });
};

const getOwnedHotels = async (req, res) => {
  const hotels = await Hotel.find({ createdBy: req.user.userId }).sort(
    "createdBy userId",
  );
  res.status(StatusCodes.OK).json({ hotels, count: hotels.length });
};

const getHotel = async (req, res) => {
  const {
    user: { userId },
    params: { id: hotelId },
  } = req;

  const hotel = await Hotel.findOne({ _id: hotelId, createdBy: userId });

  if (!hotel) {
    throw new NotFoundError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).json({ hotel });
};

const addHotel = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const hotel = await Hotel.create(req.body);
  res.status(StatusCodes.CREATED).json({ hotel });
};

const updateHotel = async (req, res) => {
  const {
    body: { name, description, year },
    user: { userId },
    params: { id: hotelId },
  } = req;

  if (name === "" || description === "" || year === "") {
    throw new BadRequestError("Name, description, year fields cannot be empty");
  }

  const hotel = await Hotel.findOneAndUpdate(
    { _id: hotelId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );

  if (!hotel) {
    throw new NotFoundError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).json({ hotel });
};

const deleteHotel = async (req, res) => {
  const {
    user: { userId },
    params: { id: hotelId },
  } = req;

  const hotel = await Hotel.findOneAndDelete({
    _id: hotelId,
    createdBy: userId,
  });
  if (!hotel) {
    throw new NotFoundError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllHotels,
  getOwnedHotels,
  getHotel,
  addHotel,
  updateHotel,
  deleteHotel,
};
