const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

// init middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
// init db

// init routers
app.get("/", (req, res) => {
  const strCompress = "Hello Nodejs";
  return res.status(200).json({
    messaga: "Welcome to Nodejs",
    metadata: strCompress.repeat(1000),
  });
});
// handling errors

module.exports = app;
