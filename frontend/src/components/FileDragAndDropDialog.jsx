const { Dialog, DialogTitle, Card, Typography } = require("@mui/material")

import React, { useContext } from 'react'
import { SetDragAndDropFileListContext } from '../contexts/DragAndDropListContext'


function FileDragAndDropDialog({ closeDialog, open }) {
    const setDragAndDropFileList = useContext(SetDragAndDropFileListContext)

    function handleClick(event) {
        console.log("FileDragAndDropDialog closed: clicked")
        // calls the function that was defined in the parent's state. this stops the Dialog from displaying 
        closeDialog()
    }

    function handleFileDrop(event) {
        event.preventDefault()
        console.log("FileDragAndDropDialog closed: dropped file(s)")
        console.log(event)
        // this is where the dragAndDropFileList context will be changed, using the data from the files that were just dragged and dropped 
        // the logic here is that the existing array / FileList is replaced
        setDragAndDropFileList(event.dataTransfer.files ?? [])
        closeDialog()
    }

    return (
        <Dialog open={open} onClick={handleClick}
            onDragOver={e => e.preventDefault()}
            onDrop={handleFileDrop}
            fullWidth={true}
            maxWidth={'lg'}
        >
            <Card sx={{padding:4, border:2, margin: 2, borderStyle: "dashed", opacity: 0.5}}>
                <Typography variant='h4' textAlign={'center'}>Drop your files to upload them</Typography>
            </Card>

        </Dialog>
    )
}
export default FileDragAndDropDialog