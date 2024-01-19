require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
// init middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// init db
require("./dbs/init.mongodb");
const { checkOverloaded } = require("./helpers/check.connect");
// init routers
app.use("/", require("./routes/index"));

// handling errors
module.exports = app;
