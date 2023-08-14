require('dotenv').config()
const express = require("express")
const router = express.Router()
const storageController = require('./storage.controller')
const {sseClientHandler, STORAGE_DIR} = require('./storage.helpers')

// creates or retrieves the only instance of the class

const uploadMiddleware = require('./storage.middleware').uploadMiddleware

// serves the files in the STORAGE_DIR as static files at the /download endpoint
router.use('/download', express.static(STORAGE_DIR))

// saves multipart/form-data as one or more files to the STORAGE_DIR
router.post("/upload", uploadMiddleware.array("uploaded_files"), storageController.uploadData)

// deletes a single file from the STORAGE_DIR
router.delete("/delete", storageController.deleteFile)

// creates a new SSE event stream for the user's client
router.get("/file-events", sseClientHandler.addNewClient)

module.exports = router