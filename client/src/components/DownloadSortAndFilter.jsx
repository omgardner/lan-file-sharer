import { MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
function DownloadSortAndFilter({ onChange, defaultSortBy}) {
    const [sortBy, setSortBy] = useState(defaultSortBy)
    return (
        <Select 
            id="sortingBox" 
            onChange={
                (e) => {
                    const newSortBy = e.target.value
                    // changes the currently selected value
                    setSortBy(newSortBy)
                    // lifts up the value's state 
                    onChange(newSortBy)
                }
            } 
            value={sortBy}>
            <MenuItem value={"uploadDate"}>Upload Date</MenuItem>
            <MenuItem value={"filename"}>File Name</MenuItem>
            <MenuItem value={"filesize"}>File Size</MenuItem>
            <MenuItem value={"fileCategory"}>File Category</MenuItem>
        </Select>
        
        
    )
}

export default DownloadSortAndFilter