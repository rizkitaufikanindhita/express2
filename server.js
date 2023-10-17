const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");

const response = require("./utils/response");

const userEndpoint = require("./routes/users");
const absenEndpoint = require("./routes/absen");

const sequelize = require("./utils/db.connect");
sequelize.sync().then(() => {
  console.log("Database Ready!");
});

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  response(200, null, "Welcome to my API", res);
});

app.use("/users", userEndpoint);

app.use("/absen", absenEndpoint);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
