import { Card } from '@mui/material';


const DownloadItem = ( {fileMetadata} ) => {
  return (
    <Card>
        <p>{fileMetadata.fileCategory}</p>
        <p>{fileMetadata.filename}</p>
        <p>{fileMetadata.size}</p>
        <p>{fileMetadata.lastModifiedTime}</p>
    </Card>
  );
}

export default DownloadItem;
