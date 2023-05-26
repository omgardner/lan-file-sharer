import { Card } from '@mui/material';
import DownloadItem from './DownloadItem';
import { useEffect, useState } from 'react';


const DownloadSection = () => {
  const [fileMetadata, setFileMetadata] = useState({})

  useEffect( () =>{
    fetch("/api")
      .then((res) => res.json())
      .then((res) => {
        setFileMetadata(res)
      })}
    , [])
    console.log(fileMetadata)

  return (
    <Card>
      <h1>Download Section</h1>
      {
        (typeof fileMetadata.files === 'undefined') ? (
          <p>Scanning for file updates...</p>
        ) : (
           fileMetadata.files.map((file) => {
            return <DownloadItem fileMetadata={file}/>
          })

          
          
          
        )
      }
    </Card>
  );
}

export default DownloadSection;
