import { Card, Grid, IconButton, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';


import DownloadItem from './DownloadItem';
import DownloadSortAndFilter from './DownloadSortAndFilter';
import { FileListContext, FileListDispatchContext } from './contexts/FileContext';

import { SERVER_URL } from '../config';
import RefreshIcon from '@mui/icons-material/Refresh';

const DownloadSection = () => {
  /**Contains everything related to the downloaded file list
   * It renders the fileMetadataArr as DownloadItem components and sorts the elements.
   */


  // handle initial retrieval of the data
  const fileMetadataArr = useContext(FileListContext)
  const dispatch = useContext(FileListDispatchContext)

  function reloadData() {
    fetch(SERVER_URL + "/api")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'reloaded', fileMetadataArr: data.files })
      })
  }

  // reload the data the first time this component is created
  useEffect(reloadData, [])

  // allows for dynamic adjustment of the sorting order for the DownloadItem components
  const defaultSortBy = "uploadDate"
  const defaultIsAscending = false

  const [sortBy, setSortBy] = useState(defaultSortBy)
  const [isAscending, setIsAscending] = useState(defaultIsAscending)

  function onSortChange(sortBy, isAscending) {
    // handles the raised state
    setSortBy(sortBy)
    setIsAscending(isAscending)
  }

  const sortingFunctionMapping = {
    "uploadDate": (a, b) => (isAscending ? a.uploadTimeEpochMs - b.uploadTimeEpochMs : b.uploadTimeEpochMs - a.uploadTimeEpochMs),
    "filename": (a, b) => (isAscending ? b.filename.localeCompare(a.filename) : a.filename.localeCompare(b.filename)),
    "fileCategory": (a, b) => (isAscending ? b.fileCategory.localeCompare(a.fileCategory) : a.fileCategory.localeCompare(b.fileCategory)),
    "filesize": (a, b) => (isAscending ? a.filesize - b.filesize : b.filesize - a.filesize)
  }

  return (
    <Card>
      <Grid container padding={1} sx={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={4}>
          <Typography variant="h5" textAlign={"center"} >Downloads</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton color="primary" aria-label="Reload files" onClick={reloadData} sx={{border: 1, borderColor: "#AAAAAA"}} size="large">
            <RefreshIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <DownloadSortAndFilter onSortChange={onSortChange} defaultSortBy={defaultSortBy} defaultIsAscending={defaultIsAscending} />
        </Grid>
      </Grid>

      {
        (typeof fileMetadataArr === 'undefined') ? (
          <p>Scanning for file updates...</p>
        ) : (
          fileMetadataArr
            .sort(sortingFunctionMapping[sortBy])
            .map((fileMetadata, i) => {
              return <DownloadItem fileMetadata={fileMetadata} key={i} />
            })
        )
      }
    </Card>
  );
}

export default DownloadSection