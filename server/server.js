const express = require('express')
const app = express()
const fs = require('fs/promises')
const multer = require('multer')

const cors = require('cors')
app.use(cors())

const STORAGE_DIR = './storage_directory/'

// serves the files in the STORAGE_DIR as static files at the /download endpoint
app.use('/download', express.static(STORAGE_DIR))


const os = require('os')
const SERVER_PORT = 5000
const SERVER_ADDRESS = os.networkInterfaces()["Ethernet"][0].address
const SERVER_URL = `http://${SERVER_ADDRESS}:${SERVER_PORT}`


// for early testing i only need the one backend API endpoint
app.get("/api", async (req, res) => {
    console.log("received request to /api")

    // gets a list of filenames
    const filenames = await fs.readdir(STORAGE_DIR)

    /*  uses those filenames to get stats for each file, and gets an array containing each file's metadata
    
        NOTE: promises aren't resolved when awaited inside an 'array.map', so you need to resolve them on the outside.
            Also, 'Promise.all' is itself a promise, meaning you need to wait for it to be resolved by using 'await'

        Helpful Resource:
            https://zellwk.com/blog/async-await-in-loops/
    */    
    const fileMetadataArr = await Promise.all(
        filenames.map(async (filename) => {
            const stats = await fs.stat(STORAGE_DIR + filename)
            return {
                "filename": filename,
                "filesize": stats.size,
                "uploadTimeEpochMs": stats.mtimeMs,
                "fileCategory": "UNKNOWN",
                "staticURL": `${SERVER_URL}/download/${filename}`
            }
        }))

    res.send({ "files": fileMetadataArr })
})

// setup middleware so that upon a POST request to the /upload endpoint the multipart/form-data is saved to the STORAGE_DIR directory.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STORAGE_DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage })

function getEpochTime() {
    return Math.floor(new Date() / 1000)
}

app.post("/upload", upload.array("uploaded_files"), async (req, res) =>{
    // the multer upload object is middleware before this current callback function. 
    // This means that the file(s), if any, are already uploaded by this point.

    // this callback function part involves saving the uploaded text into a text file.
    if (typeof req.body.uploaded_text !== 'undefined') {
        // creates a filename with a fixed prefix and the current epoch time as the suffix
        const filename = `text-upload_${getEpochTime()}.txt`
    
        console.log(filename)
        console.log(req.body.uploaded_text)
        
        // I like to live dangerously. Who needs error handling anyway? TODO (lol) add error handling to my code in various places.
        await fs.writeFile(STORAGE_DIR + filename, req.body.uploaded_text)
    }

    res.send("god i hope this worked")
    
})


app.delete("/delete", express.json(), async (req, res) => {
    const filename = req.body.filename

    fs.unlink(STORAGE_DIR+filename).then(
        (result) => res.status(200).send("Success!"),
        (result) => res.status(404).send("Failure!")
    )
})



app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_URL}`))
