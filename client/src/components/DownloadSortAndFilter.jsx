import { Box, Button, IconButton, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
function DownloadSortAndFilter({ onSortChange, defaultSortBy, defaultIsAscending }) {
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



// <Select sx={{width: "30%", borderRadius: "50px"}}
//                 onChange={
//                     (e) => {
//                         const newIsAscending = e.target.value
//                         console.log("newIsAscending")
//                         console.log(newIsAscending)
//                         // changes the currently selected value
//                         setIsAscending(newIsAscending)
//                         // lifts up the value's state
//                         onSortChange(sortBy, newIsAscending)
//                     }
//                 }
//                 value={isAscending}>
//                 <MenuItem value={true}>▲ Ascending</MenuItem>
//                 <MenuItem value={false}>▼ Descending</MenuItem>



//             </Select>
            
// <Button
//                 sx={{ width: "30%", borderRadius: "50px" }}
//                 variant="outlined"
//                 onClick={handleSortOrderToggle}
//             >{isAscending ? "Ascending" : "Descending"}
//             </Button>
// x={{width: "30%", borderRadius: "50px"}}
//                 onChange={
//                     (e) => {
//                         const newIsAscending = e.target.value
//                         console.log("newIsAscending")
//                         console.log(newIsAscending)
//                         // changes the currently selected value
//                         setIsAscending(newIsAscending)
//                         // lifts up the value's state
//                         onSortChange(sortBy, newIsAscending)
//                     }
//                 }
//                 value={isAscending}>
//                 <MenuItem value={true}>▲</MenuItem>
//                 <MenuItem value={false}>▼</MenuItem>