const { Card, Dialog, DialogTitle, Button } = require("@mui/material")
import React, { useState } from 'react'
import FileDragAndDropDialog from './FileDragAndDropDialog'

function DialogTest() {
    const [open, setOpen] = useState(false)

    return (
        <Card>
            <Button onClick={() => { setOpen(true) }}>Open Dialog</Button>
            <FileDragAndDropDialog open={open} onClose={(val) => {
                console.log(`raised state value changed to ${val}`)
                setOpen(false)
            }} />
        </Card>
    )
}

export default DialogTest