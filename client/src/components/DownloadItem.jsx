import { Card, CardMedia, CardContent, Box, Typography, Grid } from '@mui/material';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import DownloadItemInteractions from './DownloadItemInteractions';

import FileCategoryBox from './FileCategoryBox';




dayjs.extend(relativeTime)


function prettyFilesize(sizeBytes) {
  // Honestly it seems like the cleanest way to do this.
  var tmp = sizeBytes
  const cutoff = 1024

  if (tmp < cutoff) {
    return `${tmp.toFixed(2)} B`
  } else {
    tmp /= 1024
    if (tmp < cutoff) {
      return `${tmp.toFixed(2)} KB`
    } else {
      tmp /= 1024
      if (tmp < cutoff) {
        return `${tmp.toFixed(2)} MB`
      } else {
        tmp /= 1024
        if (tmp < cutoff) {
          return `${tmp.toFixed(2)} GB`
        } else {
          tmp /= 1024
          if (tmp < cutoff) {
            return `${tmp.toFixed(2)} TB`
          } else {
            // it's unrealistic that it will be reached, but the default here is to just return the bytes
            return `${sizeBytes.toFixed(2)} B`
          }
        }
      }
    }
  }

}

const DownloadItem = ({ fileMetadata }) => {

  const fullFilename = fileMetadata.filename
  const truncateAfterNChars = 100 // DEBUG

  // truncates very long filenames so that they easily fit onto the screen
  const displayedFilename = fullFilename.slice(0, truncateAfterNChars) + (fullFilename.length > truncateAfterNChars ? "..." : "")

  const displayedTimeSinceLastModification = dayjs(fileMetadata.uploadTimeEpochMs).fromNow()

  return (
    <Card sx={{ padding: 1 }}>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant='h6' title={fullFilename} noWrap={true}>
            {displayedFilename}
          </Typography>
        </Grid>
        <Grid item xs={3}>
        <FileCategoryBox fileCategory={fileMetadata.fileCategory}/>
          
        </Grid>
        <Grid item xs={2.5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>

            <Typography variant='body1'>
              {prettyFilesize(fileMetadata.filesize)}
            </Typography>
            <Typography variant='body2'>
              {displayedTimeSinceLastModification}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5.5}>
          <DownloadItemInteractions fileMetadata={fileMetadata} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default DownloadItem;

// <CardMedia
//               component="img"
//               sx={{ width: '80%', maxWidth: "64px" }}
//               image="/logo192.png"
//               alt="this is a test"
//             />