const express = require("express");
const router = express.Router();

const {
  getAllHotels,
  getOwnedHotels,
  getHotel,
  addHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotels");

router.route("/owned").get(getOwnedHotels);
router.route("/:id").get(getHotel).delete(deleteHotel).patch(updateHotel);
router.route("/").post(addHotel).get(getAllHotels);

module.exports = router;
