const mongoose = require("mongoose");

const databaseConfig = () => {
  const MONGODB_URL = process.env.MONGODB_URL;

  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
      console.log("connection failed to mongodb");
      console.log(err);
    });
};

module.exports = databaseConfig;
