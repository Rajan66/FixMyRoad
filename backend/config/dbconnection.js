const mongoose = require("mongoose");

exports.connection = () => {
  mongoose
    .connect(process.env.DATABASE, {
      retryWrites: false,
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error occured", err);
    });
};
