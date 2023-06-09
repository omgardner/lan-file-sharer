import { Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { SnackbarDataContext } from "./contexts/SnackbarContext";



function ActionSnackbar() {
    const snackbarData = useContext(SnackbarDataContext)
    useEffect(
        () => {
            
        }, [snackbarData]
    )

    const [open, setOpen] = useState(false)

    function handleClose() {
        console.log("Closing the snackbar.")
        setOpen(false)
    }

    function handleClick() {
        console.log("Opening the snackbar.")
        setOpen(true)
    }

    return (
        <>
            <Button onClick={handleClick}>Open simple snackbar</Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Welcome to the snackbar!"
            />
        </>

    )
}

export default ActionSnackbar

