const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// // GET Route for retrieving all the noparstes
// app.get("/notes", (req, res) =>
//   // console.log("Get Notes: Call router")
//   readFromFile("./db/db.json", "utf-8").then((data) => {
//     console.log("")
//   res.json(JSON.parse(data)))
//     }
// );
router.get("/notes", (req, res) => {
  readFromFile("db/db.json", "utf-8").then((data) => {
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
  //   // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newnote = {
      title,
      text,
      notes_id: uuidv4(),
    };

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

router.delete("/notes/:notes_id", (req, res) => {
  console.log("notes_id", req.params.notes_id);
  // reading notes form db.json
  let db = JSON.parse(fs.readFileSync("db/db.json"));
  // removing note with id
  let deleteNotes = db.filter((item) => item.id !== req.params.notes_id);
  // Rewriting note to db.json
  fs.writeFileSync("db/db.json", JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});

module.exports = router;
