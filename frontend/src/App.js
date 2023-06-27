import { Card, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import HeaderSection from './components/HeaderSection';
import DownloadSection from './components/DownloadSection';
import UploadSection from './components/UploadSection';
import { FileListProvider } from './components/FileContext';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container
        columns={{ xs: 8, sm: 8, md: 8, lg: 12 }}
        justifyContent="center"
      >
        <Grid item xs={8} lg={12}>
          <HeaderSection />
        </Grid>
        <Grid item xs={8}>
          <FileListProvider>
            <Card>

              <UploadSection />

              <DownloadSection />

            </Card>
          </FileListProvider>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
}

export default App;