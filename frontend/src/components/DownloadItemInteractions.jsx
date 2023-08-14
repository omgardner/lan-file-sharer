import { Box, Button } from '@mui/material'
import React from 'react'
import { BACKEND_URL } from '../config';

function DownloadItemInteractions({ fileMetadata }) {
    
    function downloadToDevice() {
        /**Downloads the file to the browser, then makes the browser click a link with the file blob attached in order to get the actual download functionality to work.
         * Notes:
         *  - I couldn't get the Preview button to work when using the `Content-Disposition: attachment` approach.
         *  - Modified code from the source: https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
        */

        fetch(fileMetadata.staticURL)
            .then((res) => res.blob())
            .then((blob) => {
                // this code enables a button click to download a file
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
        fetch(BACKEND_URL + "/api/delete/",
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({filename: fileMetadata.filename})
            }
        )
            .catch((error) => {
                console.error('Error:', error);

            });
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap" }} >
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