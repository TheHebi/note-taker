// require express
const express = require('express');
// require path
const path = require('path');
// initialize PORT var
const PORT = process.env.PORT || 3000;
// initialize app var
const app = express();

// middleware for the parsing of JSON data
app.use(express.json());
// middleware for parsing of URL encoded data
app.use(express.urlencoded({ extended: true }));
// serve static files from the '/public' folder
app.use(express.static("public"))

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);