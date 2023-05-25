import { Card } from '@mui/material';


const DownloadItem = ( {fileMetadata} ) => {
  return (
    <Card>
        <p>{fileMetadata.file_category}</p>
        <p>{fileMetadata.filename}</p>
        <p>{fileMetadata.size}</p>
        <p>{fileMetadata.upload_time}</p>
    </Card>
  );
}

export default DownloadItem;
