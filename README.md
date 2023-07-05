# LAN File Sharer
![ui-ready-to-upload](https://github.com/omgardner/lan-file-sharer/blob/main/docs/ui-ready-to-upload.png?raw=true)

## About
This lets you easily share text, photos and other files between any device in your Local Area Network, such as your phone, laptop or desktop computer.

## Why use this?
- You don't want to use a cloud service to share your files between devices
- you want a pretty and responsive UI to access a file server

## Technical Details
Frontend:
- ReactJS + Material UI

Backend:
- NodeJS + ExpressJS
> the backend is acting as both the Model and Controller in the MVC pattern, since the files are statically hosted using ExpressJS
## Feature List
### Completed
- [x] Responsive Design using Material UI React Components, supporting mobile and desktop devices
- [x] QR Code modal to quickly access the app from a mobile device
- [x] Paste or type text into a textbox, and upload a .txt file containing the text to the server
- [x] Browse to upload multiple files
- [x] Drag & Drop to upload files
- [x] The file list dynamically changes when any connected client uploads or deletes a file, achieved using using Server-Side Events
- [x] Displaying a list of downloadable files
- [x] File list sorting
- [x] File deletion
- [x] Detects the Private IP Address and creates environment variables via .env files
- [x] Cross-platform support for hosting the servers
- [x] Downloading files and Previewing their contents in a new tab

### Planned / In Progress
- [ ] (in progress) Toast / SnackBar messages to show status changes (e.g. "File(s) Uploaded Successfully", "File Deleted Successfully")
- [ ] use the [dropzone](https://www.dropzone.dev/) package to handle
  - [ ] upload in progress UI
  - [ ] cancel upload UI
  - [ ] adding support to upload folders, and displaying the folders as React Components
- [ ] CI/CD for testing and deployment
- [ ] Copy file's contents to clipboard
  - [ ] reverse proxy server to enable HTTPS to create a "[Secure Context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)", allowing access to the browser's [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
  - [ ] handling cross-platform inconsistency for support of the ClipboardAPI, especially for image files
- [ ] (in progress) build script using ShellJS package to create a production build to be hosted on a Raspberry PI with a bad CPU
- [ ] background uploads and downloads for large files, possibly using the Worker API

## How to run
- [Install NodeJS](https://nodejs.org/en)
- navigate to this repo's root folder
-  run `npm run setup-and-install` to install all the required node packages
- Run `npm run dev` to start the dev servers.

### Production Build
CI/CD isn't setup yet, but you can create a production build by running: `npm run rebuild-prod`. 

The `/backend` and `/frontend` servers are hosted on your *private IP address*. This is the IP address assigned to your computer by your router.

For example if your Private IP Address was `192.168.0.15`:
- access the app's frontend via the following url: `http://192.168.0.15:3000`
- the backend is hosted on a different port: `http://192.168.0.15:5000`

> The command line will output where it's being hosted, and should open a new tab in your browser once the frontend has launched
