const express = require("express");

// Import our modular routers for /htmlRoutes and /apiRoutes
const htmlRouter = require("./htmlRoutes");
const apiRouter = require("./apiRoutes");

const app = express();

app.use("/", htmlRouter);
app.use("/", apiRouter);

module.exports = app;
