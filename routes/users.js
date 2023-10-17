const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const response = require("../utils/response");

const userModel = require("../models/users");

const nipCheck = require("../utils/nipCheck");
const passwordCheck = require("../utils/passwordCheck");

router.get("/", async (req, res) => {
  const users = await userModel.findAll();
  response(200, users, "success", res);
});

router.post("/add", async (req, res) => {
  const { nip, nama, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const users = await userModel.create({
    nip,
    nama,
    password: encryptedPassword,
  });

  response(200, users, "Berhasil ditambah", res);
});

router.post("/login", async (req, res) => {
  const { nip, password } = req.body;

  const { userData } = await nipCheck(nip);

  if (!userData) {
    response(404, "error", "User not found", res);
  }

  const { isValidPassword } = await passwordCheck(nip, password);

  if (isValidPassword) {
    response(200, userData, "Login success", res);
  } else {
    response(401, "error", "Password is wrong", res);
  }
});

router.put("/update", async (req, res) => {
  const { nip, nama, password, passwordBaru } = req.body;

  const { userData } = await nipCheck(nip);

  if (!userData) {
    response(404, null, "User not found", res);
  }

  const { isValidPassword } = await passwordCheck(nip, password);

  const encryptedPassword = await bcrypt.hash(passwordBaru, 10);

  if (isValidPassword) {
    const users = await userModel.update(
      {
        nama,
        password: encryptedPassword,
      },
      {
        where: {
          nip: nip,
        },
      }
    );
    response(200, userData, "Berhasil diupdate", res);
  }
});

router.delete("/delete", async (req, res) => {
  const { nip, password } = req.body;

  const { userData } = await nipCheck(nip);

  if (!userData) {
    response(404, null, "User not found", res);
  }

  const { isValidPassword } = await passwordCheck(nip, password);

  if (isValidPassword) {
    const users = await userModel.destroy({
      where: {
        nip: nip,
      },
    });
    response(200, userData, "Berhasil dihapus", res);
  } else {
    response(401, "error", "Password is wrong", res);
  }
});

module.exports = router;
