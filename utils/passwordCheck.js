const bcrypt = require("bcrypt");
const nipCheck = require("./nipCheck");

const passwordCheck = async (nip, password) => {
  const { userData } = await nipCheck(nip);
  const isValidPassword = await bcrypt.compare(password, userData.password);
  return {
    isValidPassword,
  };
};

module.exports = passwordCheck;
