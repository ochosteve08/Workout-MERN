const multer = require('multer');
const cloudinary = require('cloudinary').v2;


const upload = multer({ dest: 'uploads/' });

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET',
});

// Define the file model
const fileSchema = new mongoose.Schema({
  url: String,
});
const Image = mongoose.model('File', fileSchema);

// Define the upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Save the image URL to MongoDB
    const image = new Image({ url: result.secure_url });
    await image.save();

    // Return the URL as the API response
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Make sure to replace 'YOUR_CLOUD_NAME', 'YOUR_API_KEY', and 'YOUR_API_SECRET' in the Cloudinary configuration with your actual Cloudinary credentials.




 const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: process.env.DB,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });



router.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    return res.send(imgUrl);
});





const Grid = require("gridfs-stream");


let gfs;
connection();

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

app.use("/file", upload);

// media routes
app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

app.delete("/file/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});






// To achieve file and video uploads using Google Cloud Platform (GCP) buckets, you can use Google Cloud Storage. Here's an example of how you can create an API for file and video uploads with GCP bucket integration using Node.js:

// Set up a Google Cloud Storage bucket:

// Create a new project on Google Cloud Console (https://console.cloud.google.com/).
// Enable the Google Cloud Storage API.
// Create a new bucket to store the uploaded files.
// Install dependencies:

// Use npm or yarn to install the necessary packages:


npm install express multer @google-cloud/storage
// server.js
const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const app = express();
const port = 3000;

const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: 'path-to-service-account-key-file.json',
});

const bucketName = 'your-bucket-name';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit (adjust as needed)
  },
});

// File upload endpoint
app.post('/api/files', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const bucket = storage.bucket(bucketName);

  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
  });

  blobStream.on('error', (err) => {
    console.error(err);
    return res.status(500).json({ message: 'Failed to upload file' });
  });

  blobStream.on('finish', () => {
    res.status(201).json({ message: 'File uploaded successfully' });
  });

  blobStream.end(file.buffer);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Replace 'your-project-id' with your Google Cloud project ID and provide the path to your service account key file ('path-to-service-account-key-file.json'). Also, replace 'your-bucket-name' with the name of your GCP bucket.

// This code sets up an API endpoint at /api/files that accepts file uploads. It uses the multer middleware to handle file uploads and stores the files in the specified GCP bucket.

// Remember to handle proper error handling, authentication, and authorization in your production-ready application. This example focuses on the basic structure and integration with GCP Storage.








