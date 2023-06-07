import { Card, Box, Typography, Grid } from '@mui/material';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import DownloadItemInteractions from './DownloadItemInteractions';
import FileCategoryBox from './FileCategoryBox';

dayjs.extend(relativeTime)

function prettyFilesize(sizeBytes) {
  // turns the number of bytes into a pretty string in reasonable units
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

function DownloadItem({fileMetadata}) {
  /**
   * The UI Element that represents a downloaded file
   */
  const displayedTimeSinceLastModification = dayjs(fileMetadata.uploadTimeEpochMs).fromNow()

  return (
    <Card sx={{ padding: 1 }}>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant='h6' title={fileMetadata.filename} noWrap={true}>
            {fileMetadata.filename}
          </Typography>
        </Grid>
        <Grid item xs={3}>
        <FileCategoryBox fileMetadata={fileMetadata}/>
          
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', }}>

            <Typography variant='body1'>
              {prettyFilesize(fileMetadata.filesize)}
            </Typography>
            <Typography variant='body2'>
              {displayedTimeSinceLastModification}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <DownloadItemInteractions fileMetadata={fileMetadata} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default DownloadItem;