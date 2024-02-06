const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 5500;

app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/model'); //this is where the model and texture will save
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  
  const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const uploadedFile = req.file;
  // Process the uploaded file as needed
  // For example, you can save it to disk or perform other operations
  console.log('File uploaded:', uploadedFile);
  res.status(200).send('File uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});