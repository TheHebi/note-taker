const express = require("express");
const path = require("path");
const notes = require('express').Router();
const api = require('../db/notes.json')
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
// const app = express();

notes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

// GET route for notes page
notes.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

 // API GET Request
 notes.get('/api/notes', (req, res) => {
    res.json(api);
});

// POST route for notes
notes.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text
    };

    readAndAppend(newNote, "./db/notes.json");
    res.json(`note added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

module.exports = notes