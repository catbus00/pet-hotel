const express = require("express");
const router = express.Router();

const {
  getAllHotels,
  getHotel,
  addHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotels");

router.route("/").post(addHotel).get(getAllHotels);

router.route("/:id").get(getHotel).delete(deleteHotel).patch(updateHotel);

module.exports = router;
