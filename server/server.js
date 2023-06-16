// expressjs as a web server
const express = require('express')
const app = express()

// allowing CORS, for communicating with the client that is on a different domain
const cors = require('cors')
app.use(cors())

// handling files and file metadata
const fs = require('fs/promises')
const multer = require('multer')
var mime = require('mime-types')

// serves the files in the STORAGE_DIR as static files at the /download endpoint
const STORAGE_DIR = './storage_directory/'
app.use('/download', express.static(STORAGE_DIR))

// dynamically calculates the LAN address of this server instance. useful because it relies upon the current computer's IP address. 
//      And since this address is dynamically allocated it can't be hardcoded.
const ip = require('ip')
const SERVER_PORT = 5000
const SERVER_ADDRESS = ip.address("Ethernet", "ipv4")

const SERVER_URL = `http://${SERVER_ADDRESS}:${SERVER_PORT}`


function getFileCategoryFromFileName(filename) {
    // uses the mediatype to create a categorisation for each file, used by the client to display relevant file icons next to each file
    const mediaType = mime.lookup(filename)

    try {
        switch (mediaType.split("/", 2)[0]) {
            default:
                return "misc"
            case "application":
                return "app"
            case "video":
                return "video"
            case "image":
                return "image"
            case "text":
                return "text"
            case "audio":
                return "audio"
        }
    } catch {
        // e.g. if mediaType is undefined or not a string
        return "misc"
    }

}


async function getFileMetadata(filenames) {
    /*  Uses an array of filenames to get stats for each file, and returns an array of objects containing each file's metadata
    
        NOTE: promises aren't resolved when awaited inside an 'array.map', so you need to resolve them on the outside.
            Also, 'Promise.all' is itself a promise, meaning you need to wait for it to be resolved by using 'await'

        Helpful Resource:
            https://zellwk.com/blog/async-await-in-loops/
    */
    const fileMetadataArr = await Promise.all(
        filenames.map(async (filename) => {
            try {
                const stats = await fs.stat(STORAGE_DIR + filename)
                return {
                    "filename": filename,
                    "filesize": stats.size,
                    "uploadTimeEpochMs": stats.mtimeMs,
                    "fileCategory": getFileCategoryFromFileName(filename),
                    "staticURL": `${SERVER_URL}/download/${filename}`
                }
            } catch (e) {
                //console.log(e)
                // this element has a null value caused by an error
                // most likely caused by the file not existing in the STORAGE_DIR
                return
            }

        }))
        // filters out any null elements in the array. 
    return fileMetadataArr.filter(fileMetadata => fileMetadata != null)
}


// DEBUG no longer necessary
app.get("/fetch-data-once", async (req, res) => {
    res.send({ files: await getAllFileMetadata() })
})


async function getAllFileMetadata() {
    const filenames = await fs.readdir(STORAGE_DIR)
    // retrieves metadata for each of those files
    return await getFileMetadata(filenames)
}


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

app.post("/upload", upload.array("uploaded_files"), async (req, res) => {
    // the multer upload object is middleware before this current callback function. 
    // This means that the file(s), if any, are already uploaded by this point.
    const uploadedFilenames = req.files.map((ele) => ele.originalname)

    // this callback function part involves saving the uploaded text into a text file.
    if (typeof req.body.uploaded_text !== 'undefined') {
        // creates a filename with a fixed prefix and the current epoch time as the suffix
        const textFilename = `text-upload_${getEpochTime()}.txt`

        // I like to live dangerously. Who needs error handling anyway? TODO (lol) add error handling to my code in various places.
        await fs.writeFile(STORAGE_DIR + textFilename, req.body.uploaded_text)

        uploadedFilenames.push(textFilename)
    }
    // tells the clients listening for `/file-events` that files were uploaded and provides the metadata required for displaying the new files
    sendFileEventToAll({type:'uploaded', uploadedFileMetadataArr: await getFileMetadata(uploadedFilenames)})

    // tells the client that the data was uploaded successfully
    res.status(200).end()
})


app.delete("/delete", express.json(), async (req, res) => {
    // deletes a file, then tells the client which specific file was deleted
    const filename = req.body.filename

    fs.unlink(STORAGE_DIR + filename)
    .then(() => {
        // tells the clients listening for `/file-events` that the file was deleted
        sendFileEventToAll({type:'deleted', deletedFilename: filename})
        // tells the client that the data was deleted successfully
        res.status(200).end()
    }).catch(() => {
        // tells the client that the unlink / delete operation failed.
        res.status(418).end()
    })

    // tells the client that the data was deleted successfully
    res.status(200).end()
})

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_URL}`))

let clients = []
//let fileEvents = []

async function fileEventsHandler(req, res, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    }

    // sends out the current state of the file metadata
    res.writeHead(200, headers)
    const event = {type:"reloaded", fileMetadataArr: await getAllFileMetadata()}
    const data = `data: ${JSON.stringify(event)}\n\n`
    res.write(data)

    // stores the still alive response as a unique client
    const clientId = Date.now()
    const newClient = {
        id: clientId,
        response: res
    }
    clients.push(newClient)
    console.log(`${clientId} SSE Connection opened`)

    // removes the client if the connection closes
    req.on('close', () => {
        console.log(`${clientId} SSE Connection closed`)
        clients = clients.filter(client => client.id !== clientId)
    })
}

app.get("/file-events", fileEventsHandler)

function sendFileEventToAll(newEventData){
    console.log(`Sending new event data to ${clients.length} client(s)`)
    console.log(newEventData)
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newEventData)}\n\n`))
}
