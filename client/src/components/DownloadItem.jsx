import { Card, CardMedia, CardContent, Box, Typography } from '@mui/material';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import DownloadItemInteractions from './DownloadItemInteractions';
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
  const truncateAfterNChars = 15

  // truncates very long filenames so that they easily fit onto the screen
  const displayedFilename = fullFilename.slice(0, truncateAfterNChars) + (fullFilename.length > truncateAfterNChars ? "..." : "")
  
  const displayedTimeSinceLastModification = dayjs(fileMetadata.uploadTimeEpochMs).fromNow()
  
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardMedia
          component="img"
          sx={{ height: 64, width: 64 }}
          image="/logo192.png"
          alt="this is a test"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' title={fullFilename}>
            {displayedFilename}
          </Typography>
          <Typography variant='subtitle2'>
            {fileMetadata.fileCategory}
          </Typography>
          <Typography variant='body1'>
            {prettyFilesize(fileMetadata.filesize)}
          </Typography>
          <Typography variant='body2'>
            {displayedTimeSinceLastModification}
          </Typography>
        </Box>
        <DownloadItemInteractions fileMetadata={ fileMetadata }/>
      </Box>



    </Card>
  );
}

export default DownloadItem;
