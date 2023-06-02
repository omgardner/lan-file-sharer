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

function FileCategoryBox({ fileCategory }) {
    const iconSx = { "fontSize": 60 }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
                (() => {
                    switch (fileCategory) {
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
                {fileCategory.toUpperCase()}    
            </Typography>

        </Box>
    )
}

export default FileCategoryBox