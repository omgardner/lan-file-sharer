# LAN File Sharer
## About
This lets you easily share text, photos and other files between any device in your Local Area Network.

## How to run
### installing dependencies
- install nodejs
- navigate to this repo's root folder
-  run `npm run setup-and-install` to install all the required node packages

### running the servers
- Run `npm run dev` to start the dev servers.

CI/CD isn't setup yet, but you can create a production build by running: `npm run rebuild-prod`

The `/backend` and `/frontend` servers are hosted on your *private IP address*. This is the IP address assigned to your computer by your router.

For example if your Private IP Address was `192.168.0.15`:
- access the app's frontend via the following url: `http://192.168.0.15:3000`
- the backend is hosted on a different port: `http://192.168.0.15:5000`

> The command line will output where it's being hosted, and should open a new tab in your browser once the frontend has launched
