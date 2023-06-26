# LAN File Sharer
## About
This lets you easily share text, photos and other files between any device in your Local Area Network.

## How to run
### installing dependencies
- install nodejs
- navigate to this repo's root folder
-  run `npm run install-all-deps` to install all the required node packages

### running the servers
- Run `npm run dev` to get start the dev servers.
- Run `npm run rebuild-prod` to get start the **PRODUCTION** servers.

The backend (/server folder) and frontend (/client folder) are hosted on your private IP address. This is the IP address assigned to your computer by your router.

For example if your Private IP Address was `192.168.0.15`:
- access the app via the following url: `http://192.168.0.15:3000`
- the backend is hosted on a different port: `http://192.168.0.15:5000`
