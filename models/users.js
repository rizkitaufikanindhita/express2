const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/db.connect");

class User extends Model {}

User.init(
  {
    nip: {
      type: DataTypes.INTEGER,
      unique: true,
      length: 8,
    },
    nama: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
