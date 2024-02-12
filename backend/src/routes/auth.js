const express = require("express");
const router = express.Router();

const { login, register, logoff } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logoff", logoff)

module.exports = router;
