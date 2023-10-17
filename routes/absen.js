const express = require("express");
const router = express.Router();
const response = require("../utils/response");
const absenModel = require("../models/absen");
const nipCheck = require("../utils/nipCheck");
const passwordCheck = require("../utils/passwordCheck");

router.get("/", async (req, res) => {
  const absen = await absenModel.findAll();

  response(200, absen, "Welcome to my API", res);
});

router.post("/checkin", async (req, res) => {
  const { nip, password } = req.body;

  const { userData } = await nipCheck(nip);
  if (!userData) {
    response(404, null, "User not found", res);
  }

  const { isValidPassword } = await passwordCheck(nip, password);
  if (isValidPassword) {
    const absen = await absenModel.create({
      user_nip: nip,
      status: "IN",
    });
    response(200, absen, "Berhasil checkin", res);
  } else {
    response(401, null, "Password is wrong", res);
  }
});

router.post("/checkout", async (req, res) => {
  const { nip, password } = req.body;

  const { userData } = await nipCheck(nip);
  if (!userData) {
    response(404, null, "User not found", res);
  }

  const { isValidPassword } = await passwordCheck(nip, password);
  if (isValidPassword) {
    const absen = await absenModel.create({
      user_nip: nip,
      status: "OUT",
    });
    response(200, absen, "Berhasil checkout", res);
  } else {
    response(401, null, "Password is wrong", res);
  }
});

module.exports = router;
