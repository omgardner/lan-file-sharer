import React from 'react'

// icons
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import RunCircleOutlinedIcon from '@mui/icons-material/RunCircleOutlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';

// ui components
import { Box, Typography } from '@mui/material';

function FileCategoryBox({ fileMetadata }) {
    /**Contains the file category text and a corresponding icon for each DownloadItem */
    const iconSx = { "fontSize": 60 }
    const filenameSplit = fileMetadata.filename.split(".")
    const fileExtension = filenameSplit[filenameSplit.length - 1] // gets the last element
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
                (() => {
                    switch (fileMetadata.fileCategory) {
                        default:
                            return <MiscellaneousServicesOutlinedIcon sx={iconSx} />
                        case "app":
                            return <RunCircleOutlinedIcon sx={iconSx} />
                        case "video":
                            return <VideoCameraBackOutlinedIcon sx={iconSx} />
                        case "image":
                            return <ImageOutlinedIcon sx={iconSx} />
                        case "text":
                            return <FormatAlignLeftOutlinedIcon sx={iconSx} />
                        case "audio":
                            return <MusicNoteOutlinedIcon sx={iconSx} />
                    }
                })()
            }
            <Typography variant='subtitle2' noWrap={true}>
                {fileExtension.toUpperCase()}    
            </Typography>

        </Box>
    )
}

export default FileCategoryBox