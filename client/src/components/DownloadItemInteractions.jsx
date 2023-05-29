import { Box } from '@mui/material'
import React from 'react'


function DownloadItemInteractions({ fileMetadata }) {
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


    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <button>Copy to Clipboard</button>
            </div>
            <div>
                    <button onClick={downloadToDevice}>Download to Device</button>
            </div>
            <div>
                <a href={fileMetadata.staticURL} target="_blank">
                    <button>Preview File</button>
                </a>
            </div>
            <div>
                <button>Delete File</button>
            </div>
        </Box>
    )
}

export default DownloadItemInteractions