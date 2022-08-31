const express = require("express");
const path = require("path");
// const { clog } = require("./middleware/clog");
// const api = require("./routes/index.js");

const html = require("./routes/htmlRoutes");
const api = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
// app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);
app.use("/", html);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
