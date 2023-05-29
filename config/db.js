/* Connecting to the database. */
const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
