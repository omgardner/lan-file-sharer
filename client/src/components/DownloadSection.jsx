import { Card, Box} from '@mui/material';
import DownloadItem from './DownloadItem';
import { useEffect, useState } from 'react';




const DownloadSection = () => {
  const [fileMetadata, setFileMetadata] = useState({})

  function reloadData() {
    fetch("/api")
      .then((res) => res.json())
      .then((res) => {
        setFileMetadata(res)
      })
  }

  // reload the data the first time this component is created
  useEffect(reloadData, [])
  console.log(fileMetadata)

  return (
    <Card>

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <h1>Download Section</h1>
        <button onClick={reloadData}>Refresh</button>
      </Box>

      {
        (typeof fileMetadata.files === 'undefined') ? (
          <p>Scanning for file updates...</p>
        ) : (
          fileMetadata.files.map((file) => {
            return <DownloadItem fileMetadata={file} />
          })
        )
      }
    </Card>
  );
}

export default DownloadSection;
