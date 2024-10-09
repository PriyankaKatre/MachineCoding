const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/upload-multiple", upload.array("files", 10), (req, res) => {
    const fileContents = req.files.map((file) => {
      console.log('file', file)
    const filePath = path.join(__dirname, "uploads", file.filename);
    return fs.promises.readFile(filePath, "utf8");
  });

  Promise.all(fileContents)
    .then((contents) => {
      // Save contents to a file or database
      fs.writeFileSync("fileContents.json", JSON.stringify(contents));
      res.send(contents); // Send file contents as response
    })
    .catch((err) => {
      res.status(500).send("Error reading files");
    });
});

app.get("/file-contents", (req, res) => {
  // Read contents from the file or database
  const contents = fs.readFileSync("fileContents.json", "utf8");
  res.send(JSON.parse(contents));
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
