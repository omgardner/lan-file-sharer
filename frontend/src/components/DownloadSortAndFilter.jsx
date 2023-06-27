import { Box, IconButton, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
function DownloadSortAndFilter({ onSortChange, defaultSortBy, defaultIsAscending }) {
    /**The component contains the sorting selection box and a sorting order toggle button. 
     * The state of both is lifted upwards via the onSortChange function */
    const [sortBy, setSortBy] = useState(defaultSortBy)
    const [isAscending, setIsAscending] = useState(defaultIsAscending)

    function handleSortByChange(event) {
        const newSortBy = event.target.value
        // changes the currently selected value
        setSortBy(newSortBy)
        // lifts up the value's state 
        onSortChange(newSortBy, isAscending)
    }
    function handleSortOrderToggle(event) {
        const newIsAscending = !isAscending
        setIsAscending(newIsAscending)
        onSortChange(sortBy, newIsAscending)
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
            <Select
                sx={{ width: "70%", borderRadius: "50px"}}
                onChange={handleSortByChange}
                value={sortBy}
            >
                <MenuItem value={"uploadDate"}>Upload Date</MenuItem>
                <MenuItem value={"filename"}>File Name</MenuItem>
                <MenuItem value={"filesize"}>File Size</MenuItem>
                <MenuItem value={"fileCategory"}>File Category</MenuItem>
            </Select>
            <IconButton color="primary" aria-label="Toggle Sorting Order" onClick={handleSortOrderToggle} sx={{border: 1, borderColor: "#AAAAAA"}} size='large'>
            {isAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon/>}
          </IconButton>   
        </Box>
    )
}

export default DownloadSortAndFilter