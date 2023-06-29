import { Card, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import HeaderSection from './components/HeaderSection';
import DownloadSection from './components/DownloadSection';
import UploadSection from './components/UploadSection';
import { FileListProvider } from './contexts/FileListContext';
import FileDragAndDropDialog from './components/FileDragAndDropDialog';
import { useState } from 'react';
import { DragAndDropFileListProvider } from './contexts/DragAndDropListContext';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const App = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container
        columns={{ xs: 8, sm: 8, md: 8, lg: 12 }}
        justifyContent="center"
        onDragEnter={() => {setUploadDialogOpen(true)}}
      >
        <Grid item xs={8} lg={12}>
          <HeaderSection />
        </Grid>
        <Grid item xs={8}>
          <FileListProvider>
            <Card>
              <DragAndDropFileListProvider>
                <UploadSection />
                <FileDragAndDropDialog 
                  open={uploadDialogOpen} 
                  closeDialog={() => setUploadDialogOpen(false)}/>
              </DragAndDropFileListProvider>
              <DownloadSection />

            </Card>
          </FileListProvider>
        </Grid>
      </Grid>
      
    </ThemeProvider >
  )
}

export default App;