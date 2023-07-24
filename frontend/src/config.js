//todo: why did i make this?

// loads in environment variables from the .env file to be accessed using `process.env.VAR_NAME`, such as the server's current private IP address
//require('dotenv').config()
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
console.log(BACKEND_URL)