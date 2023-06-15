SET rootDir="."
SET firefoxExe="C:\Program Files\Mozilla Firefox\firefox.exe"

: shows git status and keep a window open for anything like npm or git commands, assumes git is on your path
START cmd @cmd /K "title misc && cd %rootDir% && git status"
: starts the frontend and the backend, assumes that npm is on your path
START cmd @cmd /K "cd %rootDir%/client && npm run start"
START cmd @cmd /K "cd %rootDir%/server && npm run dev"
: temporary cmd to open vscode, assumes that vscode is on your path
START cmd @cmd /C code %rootDir%
: opens the figma design and the trello board
: change the IP to whatever your current machine's private IP is. Can check it on windows with `ipconfig`
START cmd @cmd /C %firefoxExe% http://192.168.0.21:3000 https://trello.com/b/YO9EUNbt/lan-file-sharer-web-app https://www.figma.com/file/AQv5Z7kc4GItZl9Ps4tjAK/Home-Data-Sharing

: opens file explorer here
explorer .
