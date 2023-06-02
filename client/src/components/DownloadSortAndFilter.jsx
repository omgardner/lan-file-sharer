import { Box, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
function DownloadSortAndFilter({ onSortChange, defaultSortBy, defaultIsAscending }) {
    const [sortBy, setSortBy] = useState(defaultSortBy)
    const [isAscending, setIsAscending] = useState(defaultIsAscending)
    return (
        <Box>
            <Select
                onChange={
                    (e) => {
                        const newSortBy = e.target.value
                        // changes the currently selected value
                        setSortBy(newSortBy)
                        // lifts up the value's state 
                        onSortChange(newSortBy, isAscending)
                    }
                }
                value={sortBy}>
                <MenuItem value={"uploadDate"}>Upload Date</MenuItem>
                <MenuItem value={"filename"}>File Name</MenuItem>
                <MenuItem value={"filesize"}>File Size</MenuItem>
                <MenuItem value={"fileCategory"}>File Category</MenuItem>
            </Select>
            <Select
                onChange={
                    (e) => {
                        const newIsAscending = e.target.value
                        console.log("newIsAscending")
                        console.log(newIsAscending)
                        // changes the currently selected value
                        setIsAscending(newIsAscending)
                        // lifts up the value's state 
                        onSortChange(sortBy, newIsAscending)
                    }
                }
                value={isAscending}>
                <MenuItem value={true}>Ascending</MenuItem>
                <MenuItem value={false}>Descending</MenuItem>
            </Select>
        </Box>



    )
}

export default DownloadSortAndFilter