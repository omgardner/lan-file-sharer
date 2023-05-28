import {Box,  Card, Typography, CardContent } from '@mui/material';

// https://mui.com/material-ui/react-card/#ui-controls
const HeaderSection = () => {
    return (
        <Card>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography component="div" variant="h5">
                    Home Data Sharing
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Transfer files between LAN devices
                </Typography>
            </Box>
        </Card>
    );
}

export default HeaderSection;
