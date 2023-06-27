const fs = require('fs/promises')
const os = require('os')
const path = require('path')

function getPrivateIPAddress() {
    // ensures that only a private IP address gets retrieved, returning null if it wasn't found.
    // note: the 'ip' npm package uses os.networkInterfaces() anyway, so it's cleaner to write this custom functionality myself.
    const interfaces = os.networkInterfaces()
    for (const [key, valueArr] of Object.entries(interfaces)) {
        for (const netInterface of valueArr) {
            if (netInterface.family === "IPv4" && netInterface.address.startsWith("192.168")) {
                return netInterface.address
            }
        }
    }
    return null
}

function objectToConfigString(obj) {
    // takes an object and formats a string of .env format
    return Object.entries(obj)
        .map((pair) => `${pair[0]}=${pair[1]}`)
        .join("\n")
}

const privateIPAddress = getPrivateIPAddress()
if (privateIPAddress === null){
    throw new Error("A private IP address could not be found across your network interfaces. This suggests that you are not connected to a network at all, so double check your WiFi / Ethernet cable and try again.")
}

const FRONTEND_PORT = 3000
const BACKEND_PORT = 5000

// create-react-app uses dotenv on the backend, but will ignore any env var that doesn't start with `REACT_APP_`
frontendEnvVars = {
    HOST: privateIPAddress,
    PORT: FRONTEND_PORT,
    REACT_APP_BACKEND_URL: `http://${privateIPAddress}:${BACKEND_PORT}`,
    //BROWSER: "none" // uncomment this to stop react-scripts from opening a new window when the frontend server starts
}

backendEnvVars = {
    PRIVATE_IP_ADDR: privateIPAddress,
    FRONTEND_PORT: FRONTEND_PORT,
    BACKEND_PORT: BACKEND_PORT,
}

// writes the data to .env files located at the root directories of the frontend and backend
const frontendEnvPath = path.join(__dirname, "frontend", ".env")
const backendEnvPath = path.join(__dirname, "backend", ".env")

fs.writeFile(frontendEnvPath, objectToConfigString(frontendEnvVars))
    .then("The frontend .env file was updated successfully.")
fs.writeFile(backendEnvPath, objectToConfigString(backendEnvVars))
    .then("The backend .env file was updated successfully.")

