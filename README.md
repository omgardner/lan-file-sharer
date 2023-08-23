# LAN File Sharer
![ui-ready-to-upload](https://github.com/omgardner/lan-file-sharer/blob/main/docs/ui-ready-to-upload.png?raw=true)

[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/AQv5Z7kc4GItZl9Ps4tjAK/Home-Data-Sharing?type=design&node-id=0%3A1&mode=design&t=B98xeqpRSfb4zK0W-1)
## About
This lets you easily share text, photos and other files between any device in your Local Area Network, such as your phone, laptop or desktop computer.

## Why use this?
- You don't want to use a cloud service to share your files between devices
- you want a pretty and responsive UI to access a file server
- scan a QR code to quickly connect to to the webpage

## How to run
- [Install NodeJS](https://nodejs.org/en)
- navigate to this repo's root folder
-  run `npm run setup-and-install` to install all the required node packages
- Run `npm run dev` to start the dev servers.

## Tests (new)
> unit and integration tests for the backend
- run `npm run setup-and-install` if you haven't already, or if your device's private ip address has changed
- Run `npm run test` to see the tests in action.

## Feature List
### Completed
- [x] Unit and Integration Tests for the backend code
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
- [ ] switching from react-scripts to vite
- [ ] Toast / SnackBar messages to show status changes (e.g. "File(s) Uploaded Successfully", "File Deleted Successfully")
- [ ] use the [dropzone](https://www.dropzone.dev/) package to handle
  - [ ] upload in progress UI
  - [ ] cancel upload UI
  - [ ] adding support to upload folders, and displaying the folders as React Components
- [ ] Copy file's contents to clipboard
  - [ ] reverse proxy server to enable HTTPS to create a "[Secure Context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)", allowing access to the browser's [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
  - [ ] handling cross-browser inconsistency for support of the ClipboardAPI, especially for image files
- [ ] build script using ShellJS package to create a production build to be hosted on a Raspberry PI with a bad CPU
- [ ] background uploads and downloads for large files, possibly using the Worker API

## Technical Details
Frontend:
- ReactJS + Material UI

Backend:
- NodeJS + ExpressJS
> the backend is acting as both the Model and Controller in the MVC pattern, since the files are statically hosted using ExpressJS

Testing:
Backend Testing: 
- `jest` for the test suite
- `needle` to simulate the http client
- `eventsource` to simulate the SSE client
- `stoppable` to stop the http server quickly

## Production Build
The prod build is a work in progress, but when running it it reduces the size of the react bundle sent to the browser. It can be run using: `npm run rebuild-prod`. 

The `/backend` and `/frontend` servers are hosted on your *private IP address*. This is the IP address assigned to your computer by your router.

For example if your Private IP Address was `192.168.0.15`:
- access the app's frontend via the following url: `http://192.168.0.15:3000`
- the backend is hosted on a different port: `http://192.168.0.15:5000`

> The command line will output where it's being hosted, and should open a new tab in your browser once the frontend has launched

## Why I made this
- to learn ReactJS
- to learn MVC pattern
- i've always been interested in UIs but found it daunting in the past
- I'd like to transition towards a career path that more involves web development.

## More Images
![ui-mobile-files-uploaded](https://github.com/omgardner/lan-file-sharer/blob/main/docs/ui-mobile-files-uploaded.png?raw=true)
> Responsive design, showing the text and files that were just uploaded


![ui-drag-and-drop](https://github.com/omgardner/lan-file-sharer/blob/main/docs/ui-drag-and-drop.png?raw=true)
> Drag & Drop UI modal
