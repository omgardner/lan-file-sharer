require('dotenv').config()
var app = require("./app")

app.listen(
    process.env.BACKEND_PORT, 
    process.env.PRIVATE_IP_ADDR, 
    () => console.log(`The backend server is listening on ${process.env.BACKEND_URL}`)
)
