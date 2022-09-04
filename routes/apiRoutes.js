const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the noparstes
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json", "utf-8").then((data) => {
    let parseNotes;
    try {
      parseNotes = [].concat(JSON.parse(data));
    } catch (err) {
      parseNotes = [];
    }
    // return parseNotes;
    res.json(parseNotes);
  });
});

// POST Route for submitting notes
router.post("/notes", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newnote = {
      title,
      text,
      id: uuidv4(),
    };

    // Read new note and add to the db.json file
    readAndAppend(newnote, "./db/db.json");

    const response = {
      status: "success",
      body: newnote,
    };

    res.json(response);
  } else {
    res.json("Error in posting notes");
  }
});

// Delete a selected note
router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  readFromFile("./db/db.json", "utf-8").then((results) => {
    const notes = JSON.parse(results);
    const filterNotes = notes.filter((note) => note.id !== id);
    writeToFile("./db/db.json", filterNotes);
    // res.status(200);
    res.json(notes);
  });
});

module.exports = router;
