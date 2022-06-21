const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

require("./jwtConfig");

const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {res.status(404).json({
    status: "Error",
    code: 404,
    message: `Use api on routes`,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "Fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
