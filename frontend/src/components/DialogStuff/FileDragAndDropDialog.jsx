const { Dialog, DialogTitle } = require("@mui/material")

import React, { useContext } from 'react'
import { SetDragAndDropFileListContext } from '../../contexts/DragAndDropListContext'


function FileDragAndDropDialog({ closeDialog, open }) {
    const setDragAndDropFileList = useContext(SetDragAndDropFileListContext)

    function handleClick(event) {
        console.log("FileDragAndDropDialog closed: clicked")
        // calls the function that was defined in the parent's state. this stops the Dialog from displaying 
        closeDialog()
    }

    function handleFileDrop(event){
        event.preventDefault()
        console.log("FileDragAndDropDialog closed: dropped file(s)")
        console.log(event)
        // this is where the dragAndDropFileList context will be changed, using the data from the files that were just dragged and dropped 
        setDragAndDropFileList(event.dataTransfer.files ?? [])
        closeDialog()
    }

    return (
        <Dialog open={open} onClick={handleClick}
            onDragOver={e => e.preventDefault()}
            onDrop={handleFileDrop}
            >
                <DialogTitle>Let's enter a dialogue about this.</DialogTitle>
                <p>How does this display?</p>
        </Dialog>
    )
}
export default FileDragAndDropDialog