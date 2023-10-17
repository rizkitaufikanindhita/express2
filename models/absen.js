const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/db.connect");

class Absen extends Model {}

Absen.init(
  {
    user_nip: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("IN", "OUT"),
    },
  },
  {
    sequelize,
    modelName: "Absen",
  }
);

module.exports = Absen;
