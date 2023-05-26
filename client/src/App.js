import { Box, Card, CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import './App.css';
import Header from './components/HeaderSection';
import DownloadSection from './components/DownloadSection';
import UploadSection from './components/UploadSection';
import { useEffect } from 'react';
  

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});


const App = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Grid container
        spacing={{ xs: 1, md: 1.5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Header/>
        </Grid>
        <Grid item xs={8}>
          <UploadSection/>
          <DownloadSection/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
