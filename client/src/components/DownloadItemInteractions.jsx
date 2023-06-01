import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { SERVER_URL } from '../config';
import { FileListDispatchContext } from './FileContext';



function DownloadItemInteractions({ fileMetadata }) {

    const dispatch = useContext(FileListDispatchContext)

    async function copyFileToClipboard() {
        // const imgURL = fileMetadata.staticURL;
        // const data = await fetch(imgURL);
        // const blob = await data.blob();
        // const fr = new FileReader()
        // fr.readAsDataURL(blob)
        // fr.onload =  (e) => {
        //     console.log('DataURL:', e.target.result);
        //     navigator.clipboard.writeText   (e.target.result)
        // }



        try {
            const text = await fetch(fileMetadata.staticURL).then(x => x.text())
            //const data = await fetch(imgURL)
            //const blob = await data.blob()
            //console.log(data.headers.get("Content-Type"),blob.type)
            //console.log(text.slice(0,50)+`... (len=${text.length})`)
            //console.log(imgURL)
            console.log(navigator)
            navigator.clipboard.writeText(text)
            // await navigator.clipboard.write([
            //     new ClipboardItem({
            //         [`${blob.type}`]: blob,
            //     }),
            // ]);
            console.log("Fetched text file copied as raw text.");
        } catch (err) {
            console.error(err.name, err.message);
        }
    }

    //     try {
    //         const imgURL = fileMetadata.staticURL;
    //         const data = await fetch(imgURL);

    //         const blob = await data.blob()
    //         console.log(blob)

    //         await navigator.clipboard.write([
    //             new ClipboardItem({
    //                 [`web ${blob.type}`]: blob,
    //             }),
    //         ]);
    //         console.log("Fetched image copied.");
    //     } catch (err) {
    //         console.error(err.name, err.message);
    //     }
    // }




    // debug just copying the filename to clipboard
    //navigator.clipboard.writeText(fileMetadata.filename);


    function downloadToDevice() {

        fetch(fileMetadata.staticURL)
            .then((res) => res.blob())
            .then((blob) => {
                // based around https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
                const fileURL = window.URL.createObjectURL(blob);
                let link = document.createElement('a');

                link.href = fileURL
                link.download = fileMetadata.filename

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            })
    }

    function deleteFile() {

        fetch(SERVER_URL + "/delete ",
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "filename": fileMetadata.filename })
            }
        ).then((result) => result.json())
            .then((data) => {
                console.log('Success, removing the file from the local array')
                dispatch({ type: 'deleted', deletedFilename: data.deletedFilename })

            })
            .catch((error) => {
                console.error('Error:', error);

            });
    }




    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap"}} >
            <div>
            <Button variant="outlined" size='medium' onClick={copyFileToClipboard}>Copy</Button>
            </div>
            <div>
                <Button variant="outlined" size='medium' onClick={downloadToDevice}>Download</Button>
            </div>
            <div>
                <a href={fileMetadata.staticURL} target="_blank" rel="noreferrer">
                    <Button variant="outlined" size='medium'>Preview</Button>
                </a>
            </div>
            <div>
                <Button variant="outlined" size='medium' onClick={deleteFile}>Delete</Button>
            </div>
        </Box>
    )
}

export default DownloadItemInteractions