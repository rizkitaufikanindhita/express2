const userModel = require("../models/users");

const nipCheck = async (nip) => {
  const userData = await userModel.findOne({
    where: {
      nip: nip,
    },
  });
  return {
    userData,
  };
};

module.exports = nipCheck;
