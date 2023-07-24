// loads in environment variables from the .env file to be accessed using `process.env.VAR_NAME`, such as the server's current private IP address
require('dotenv').config()

// expressjs as a web server
const express = require('express')
const app = express()

const fileRouter = require("./api/storage/storage.router")

app.use(require('cors')())
app.use(express.json())


// routing
app.use("/api", fileRouter)

module.exports = app