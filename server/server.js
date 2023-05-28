const express = require('express')
const app = express()
const fs = require('fs/promises')
const multer = require('multer')

const cors = require('cors')
app.use(cors())

// for early testing i only need the one backend API endpoint
app.use("/api", async (req, res) => {
    console.log("received request to /api")

    const rootStorageDirectory = './storage_directory/';

    // gets a list of filenames
    const filenames = await fs.readdir(rootStorageDirectory)

    /*  uses those filenames to get stats for each file, and gets an array containing each file's metadata
    
        NOTE: promises aren't resolved when awaited inside an 'array.map', so you need to resolve them on the outside.
            Also, 'Promise.all' is itself a promise, meaning you need to wait for it to be resolved by using 'await'

        Helpful Resource:
            https://zellwk.com/blog/async-await-in-loops/
    */    
    const fileMetadataArr = await Promise.all(
        filenames.map(async (filename) => {
            const stats = await fs.stat(rootStorageDirectory + filename)
            return {
                "filename": filename,
                "size": stats.size,
                "lastModifiedTime": stats.mtime,
                "fileCategory": "UNKNOWN"
            }
        }))

    res.send({ "files": fileMetadataArr })
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage_directory')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage })

app.use("/upload", upload.array("uploaded_files"), (req, res) =>{
    res.send("god i hope this worked")
})



app.listen(5000, () => console.log("Listening on http://localhost:5000"))
