const { Dialog, DialogTitle, Card, Typography } = require("@mui/material")

import React, { useContext } from 'react'
import { SetDragAndDropFileListContext } from '../contexts/DragAndDropListContext'


function FileDragAndDropDialog({ closeDialog, open }) {
    const setDragAndDropFileList = useContext(SetDragAndDropFileListContext)

    function handleFileDrop(event) {
        // this is where the dragAndDropFileList context will be changed, using the data from the files that were just dragged and dropped 
        event.preventDefault()
        
        // The existing value is replaced
        setDragAndDropFileList(event.dataTransfer.files ?? [])
        closeDialog()
    }

    return (
        <Dialog open={open} 
            onDragOver={(e => e.preventDefault())}
            onDrop={handleFileDrop}
            onMouseOver={() => {
                /** This event occurs if the user is no longer dragging a file, but the dialog is still open. 
                 * This edge-case implies that the dialog is still open when it shouldn't be, so this callback function just closes the dialog.
                 * (e.g. if the user cancelled the drag and drop by pressing the escape key or by right-clicking the mouse)
                 * 
                 * Note that for the dialog to be open the user must have already been dragging a file.
                 */
                closeDialog()
            }}
            onClick={closeDialog}
            fullWidth={true}
            maxWidth={'lg'}
        >
            <Card sx={{ padding: 4, border: 2, margin: 2, borderStyle: "dashed", opacity: 0.5 }}>
                <Typography variant='h4' textAlign={'center'}>Drop your files to upload them</Typography>
            </Card>

        </Dialog>
    )
}
export default FileDragAndDropDialog