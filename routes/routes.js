const express = require("express");
const path = require("path");
const notes = require('express').Router();
const api = require('../db/notes.json')
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
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
   readFromFile(path.join(__dirname,"../db/notes.json")).then(data=>{
    res.json(JSON.parse(data))
   })
   .catch(err=>{
     console.log(err)
   })
    // res.json(api);
});

// get request for specific note
notes.get("/api/notes/:id", (req,res) => {
  // display json for the notes array indices of the provided id
  res.json(notes[req.params.id]);
});

// POST route for notes
notes.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id:api.length?api[api.length-1].id + 1:1
    };

    readAndAppend(newNote, "./db/notes.json");
    api.push(newNote)
    res.json(`note added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

// DELETE route for notes

notes.delete("/api/notes/:id",(req,res)=>{
  console.log(api,req.params)
  let foundNote = false;
  api.forEach((note,idx)=>{
      if(note.id===parseInt(req.params.id)){
          foundNote = true;
          api.splice(idx,1)
        // api.filter(note=> note.id != +req.params.id)
        // foundNote = true
          writeToFile("db/notes.json",api,(err)=>{
              if(err){
                  console.log(err);
                  return res.status(500).send("error");
              } else{ 
                return res.send("deleted!")
              }
          })
      }
  })
  if(!foundNote){
      return res.status(404).send("note not found")
  }
})

module.exports = notes