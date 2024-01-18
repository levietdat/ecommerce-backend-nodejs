"use strict";
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;
//count connect
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
};

//check overloaded
const checkOverloaded = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numberCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numberCores * 5;
    if (numConnections > maxConnections) {
      console.log(`Connection overload detected`);
    }
    console.log(`Active connections: ${numConnections}`);
    console.log(`Memory usage: ${memoryUsage / 1024 ** 2} MB`);
  }, _SECONDS); // Monitor every 5 seconds
};
module.exports = {
  countConnect,
  checkOverloaded,
};
