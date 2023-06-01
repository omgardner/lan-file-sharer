import { Card, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DownloadItem from './DownloadItem';
import { useContext, useEffect, useState } from 'react';
import DownloadSortAndFilter from './DownloadSortAndFilter';
import { SERVER_URL } from '../config';
import { FileListContext, FileListDispatchContext } from './FileContext';




const DownloadSection = () => {
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
  const [sortIsAscending, setsortIsAscending] = useState(defaultIsAscending)

  const sortingFunctionMapping = {
    "uploadDate": (a, b) => (sortIsAscending ? a.uploadTimeEpochMs - b.uploadTimeEpochMs : b.uploadTimeEpochMs - a.uploadTimeEpochMs),
    "filename": (a, b) => (sortIsAscending ? b.filename.localeCompare(a.filename) : a.filename.localeCompare(b.filename)),
    "fileCategory": (a, b) => (sortIsAscending ? b.fileCategory.localeCompare(a.fileCategory) : a.fileCategory.localeCompare(b.fileCategory)),
    "filesize": (a, b) => (sortIsAscending ? a.filesize - b.filesize : b.filesize - a.filesize)
  }

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <h1>Download Section</h1>
        <button onClick={reloadData}>Refresh</button>
        <DownloadSortAndFilter onChange={setSortBy} defaultSortBy={defaultSortBy} defaultIsAscending={defaultIsAscending} />
        <p>DEBUG Sorting by: {sortBy}</p>
      </Box>

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

export default DownloadSection;
