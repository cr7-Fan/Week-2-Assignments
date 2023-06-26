/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/:example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
// s-1  make the necessary imports
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000

// s-3 creating the endpoints
// first endpoint
app.get('/files', (req, res) => {
  const folderPath = '02-nodejs\\files'; // Replace with the actual folder path

  // Read the contents of the folder
  let result = [];
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err).status(500);
      return;
    }
    res.send({ files }).status(200);


  });


});
// second endpoint
app.get('/file/:filename', (req, res) => {
  // let name = req.params.filename;
  // console.log(typeof name);
  //   const fs = require('fs');
  // const path = require('path');

  const fileName = req.params.filename; // Extract the file name from the path parameter
  const filePath = '02-nodejs\\files' + '\\' + fileName.substring(1, fileName.length); // Replace with the actual path to the files

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(404).send("File Not Found");
    }

    res.send(data).status(200); // Send the file contents as the response
  });



})


app.use((req, res) => {
  res.status(404).json({ error: 'Route Not found' });
});


// s-2  start the server
function started() {
  console.log(`Example app listening on port ${port}`)
}

app.listen(port, started)




module.exports = app;
