var mime = require('mime-types')
const fs = require('fs')
const path = require('path')

// use a separate folder for testing. This assumes that the prod and dev server will use the same directory
const STORAGE_DIR = process.env.NODE_ENV == "test" 
    ? process.env.TEST_STORAGE_DIR 
    : process.env.PROD_STORAGE_DIR


getFileCategoryFromFileName = (filename) => {
    // uses the mediatype to create a categorisation for each file, used by the frontend to display relevant file icons next to each file
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

getEpochTime = () => {
    return Math.floor(new Date() / 1000)
}

getFileMetadata = (filenames) => {
    /*  Uses an array of filenames to get stats for each file, and returns an array of objects containing each file's metadata
    
        NOTE: promises aren't resolved when awaited inside an 'array.map', so you need to resolve them on the outside.
            Also, 'Promise.all' is itself a promise, meaning you need to wait for it to be resolved by using 'await'

        Helpful Resource:
            https://zellwk.com/blog/async-await-in-loops/
    */
    var fileMetadata = []

    filenames.forEach((filename) => {
        const stats = fs.statSync(path.join(STORAGE_DIR, filename))
        if (stats !== null) {
            fileMetadata.push({
                filename: filename,
                filesize: stats.size,
                uploadTimeEpochMs: stats.mtimeMs,
                fileCategory: getFileCategoryFromFileName(filename),
                staticURL: `${process.env.BACKEND_URL}/api/download/${filename}`
            })
        }
    })
    return fileMetadata
}

getAllFileMetadata = () => {
    const filenames = fs.readdirSync(STORAGE_DIR)
    // retrieves metadata for each of those files
    return getFileMetadata(filenames)
}


// singleton pattern. i think the functions utilise closures to access the 'clients' and 'headers' variables.
// https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-a-singleton-in-javascript
// this is the least-hacky method to implement the singleton pattern I could find

var sseClient = (function () {
    // declare private information:
    var clients = []
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    }

    // return public information (usually functions):
    return {
        addNewClient: async function(req, res, next) {
    
            // sends out the current state of the file metadata
            const event = { type: "reloaded", fileMetadataArr: await getAllFileMetadata()}
            const data = `data: ${JSON.stringify(event)}\n\n`
        
            // begins the initial SSE event-stream, and sends out the current state of the STORAGE_DIR (as fetched by getAllFileMetadata)
            res.writeHead(200, headers)
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
        },
        sendFileEventToAll: function(newEventData) {
            console.log(`Sending new event data to ${clients.length} client(s)`)
            console.log(newEventData)
            clients.forEach(client => client.response.write(`data: ${JSON.stringify(newEventData)}\n\n`))
        }
    }
})()

module.exports = {
    STORAGE_DIR: STORAGE_DIR,
    getFileCategoryFromFileName: getFileCategoryFromFileName,
    getEpochTime: getEpochTime,
    getAllFileMetadata: getAllFileMetadata,
    getFileMetadata: getFileMetadata,
    sseClient:sseClient
}