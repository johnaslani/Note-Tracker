const app = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// // GET Route for retrieving all the notes
// app.get("/notes", (req, res) =>
//   // console.log("Get Notes: Call router")
//   readFromFile("./db/db.json", "utf-8").then((data) => {
//     console.log("")
//   res.json(JSON.parse(data)))
//     }
// );
app.get("/notes", (req, res) => {
  readFromFile("db/db.json", "utf-8").then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for submitting notes

app.post("/notes", (req, res) => {
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

module.exports = app;
