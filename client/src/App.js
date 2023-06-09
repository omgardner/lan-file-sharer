import { Card, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import HeaderSection from './components/HeaderSection';
import DownloadSection from './components/DownloadSection';
import UploadSection from './components/UploadSection';
import { FileListProvider } from './components/contexts/FileContext';
import { SnackbarProvider } from './components/contexts/SnackbarContext';
import ActionSnackbar from './components/ActionSnackbar';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});
console.log(theme)

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
            <SnackbarProvider>
              <Card>
                <UploadSection />
                <DownloadSection />
              </Card>
              <ActionSnackbar/>
            </SnackbarProvider>
          </FileListProvider>

        </Grid>
      </Grid>
    </ThemeProvider >
  );
}

export default App;