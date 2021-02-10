const mongoose = require("mongoose");
const config = require("../config");

const Connect = () => {
  mongoose
    .connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = Connect;