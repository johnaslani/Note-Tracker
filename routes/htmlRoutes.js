const router = require("express").Router();

const path = require("path");

// GET Route for Note page
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

// GET Route for Note page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
  console.log(__dirname);
});

// Wildcard route to direct users to main page
router.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

module.exports = router;
