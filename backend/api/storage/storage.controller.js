const { STORAGE_DIR, sseSendFileEventToAll} = require('./storage.helpers')
const fs = require('fs/promises')
const path = require('path')

uploadData = async (req, res) => {
    // the multer upload object is middleware before this current callback function. 
    // This means that the file(s), if any, are already uploaded by this point.
    const uploadedFilenames = req.files.map((ele) => ele.originalname)

    // this callback function part involves saving the uploaded text into a text file.
    if (typeof req.body.uploaded_text !== 'undefined') {
        // creates a filename with a fixed prefix and the current epoch time as the suffix.
        const textFilename = `text-upload_${getEpochTime()}.txt`

        // I like to live dangerously. Who needs error handling anyway? '
        // TODO: best practices, make code compatible with unit tests and integration tests
        await fs.writeFile(path.join(STORAGE_DIR, textFilename), req.body.uploaded_text)

        uploadedFilenames.push(textFilename)
    }
    // tells the clients listening for `/file-events` that files were uploaded and provides the metadata required for displaying the new files
    sseSendFileEventToAll({ type: 'uploaded', uploadedFileMetadataArr: await getFileMetadata(uploadedFilenames) })

    // tells the client that the data was uploaded successfully
    res.status(200).end()
}

deleteFile = async (req, res) => {
    // todo: there's a better way to handle async promises here.
    // deletes a file, then tells the client which specific file was deleted
    const filename = req.body.filename
    fs.unlink(path.join(STORAGE_DIR, filename))
        .then(sseSendFileEventToAll({ type: 'deleted', deletedFilename: filename }))
        .then(() => res.status(200).end())
        .catch(() => {
            // tells the client that the unlink / delete operation failed.
            res.status(418).end()
        })

    // tells the client that the data was deleted successfully
    res.status(200).end()
}

module.exports = {
    uploadData: uploadData,
    deleteFile: deleteFile
}