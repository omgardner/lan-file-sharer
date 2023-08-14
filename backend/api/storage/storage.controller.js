const { STORAGE_DIR, sseClientHandler} = require('./storage.helpers')
const fs = require('fs')
const path = require('path')
// var send = require('send')
// var parseUrl = require('parseurl')



// staticDownloads = async (req, res) => {
//     console.log(req)
//     send(req, "", { index: false, root: STORAGE_DIR })
//     .once('file', (res, stat) => {
//         console.log("send file debug:", stat)
//     })
//     .pipe(res)
// }

uploadData = (req, res) => {
    // the multer upload object is middleware before this current callback function. 
    // This means that the file(s), if any, are already uploaded by this point.
    const uploadedFilenames = req.files.map((ele) => ele.originalname)

    // this callback function part involves saving the uploaded text into a text file.
    if (typeof req.body.uploaded_text !== 'undefined') {
        // creates a filename with a fixed prefix and the current epoch time as the suffix.
        const textFilename = `text-upload_${getEpochTime()}.txt`

        // I like to live dangerously. Who needs error handling anyway? '
        // TODO: best practices, make code compatible with unit tests and integration tests
        fs.writeFileSync(path.join(STORAGE_DIR, textFilename), req.body.uploaded_text)

        uploadedFilenames.push(textFilename)
    }
    // tells the clients listening for `/file-events` that files were uploaded and provides the metadata required for displaying the new files
    sseClientHandler.sendFileEventToAll({ type: 'uploaded', uploadedFileMetadataArr: getFileMetadata(uploadedFilenames)})

    // tells the client that the data was uploaded successfully
    res.status(200).end()
}

deleteFile = (req, res) => {
    // deletes a file, then tells the client which specific file was deleted
    const filename = req.body.filename
    try {
        fs.unlinkSync(path.join(STORAGE_DIR, filename))
        sseClientHandler.sendFileEventToAll({ type: 'deleted', deletedFilename: filename })
        res.status(200).end()
    } catch {
        res.status(418).end()
    }
}

module.exports = {
    uploadData: uploadData,
    deleteFile: deleteFile,
}