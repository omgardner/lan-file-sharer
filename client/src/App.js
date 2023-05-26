import { Card, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import Header from './components/HeaderSection';
import DownloadSection from './components/DownloadSection';
import UploadSection from './components/UploadSection';



const theme = createTheme({
  palette: {
    mode: 'light',
  },
});


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container
        columns={{ xs: 8, sm: 8, md: 8, lg: 12}}
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={8}>
            <Card>
              <UploadSection />
              <DownloadSection />
            </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;

/* <Grid container
        spacing={{ xs: 1, md: 1.5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
      ></Grid> */