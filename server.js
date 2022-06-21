const mongoose = require("mongoose");

const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGO_DB = process.env.MONGO_DB;

const connection = mongoose.connect(MONGO_DB);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Database connection successfully. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
