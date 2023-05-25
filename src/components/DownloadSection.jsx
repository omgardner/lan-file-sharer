import { Card } from '@mui/material';
import DownloadItem from './DownloadItem';


const DownloadSection = () => {
  const testFileMetadata = {
    file_category: "IMAGE",
    filename: "Flowers_final(1).png",
    size: 29345623,
    upload_time: "DATE TIME"
  }

  return (
    <Card>
        <h1>Download Section</h1>
        <DownloadItem fileMetadata = {testFileMetadata}/>
        <DownloadItem fileMetadata = {testFileMetadata}/>
        <DownloadItem fileMetadata = {testFileMetadata}/>
    </Card>
  );
}

export default DownloadSection;
