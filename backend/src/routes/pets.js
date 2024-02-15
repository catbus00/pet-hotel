const express = require("express");
const router = express.Router();

const {
  getAllPets,
  getAllHotelsPets,
  getPet,
  addPet,
  updatePet,
  deletePet,
} = require("../controllers/pets");

router.route("/").post(addPet).get(getAllPets);
router.route("/owned").get(getAllHotelsPets);
router.route("/:id").get(getPet).delete(deletePet).patch(updatePet);

module.exports = router;
