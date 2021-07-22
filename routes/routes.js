const express = require("express");
const path = require("path");
const notes = require('express').Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
// const app = express();

notes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

// GET route for notes page
notes.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

module.exports = notes