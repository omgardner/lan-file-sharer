import { Card, Typography, CardContent, Button, Grid } from '@mui/material';
import { useState } from 'react';
import QRCodeDialog from './QRCodeDialog';

const HeaderSection = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    return (
        <Card padding={2}>
            <Grid container sx={{ direction: 'row', alignItems: 'center', justifyContent: 'center'}}
                columns={{ xs: 8, sm: 8, md: 8, lg: 12 }}>
                <Grid item xs={6} padding={2}>
                    <Typography component="div" variant="h5">
                        Home Data Sharing
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Transfer files between LAN devices
                    </Typography>
                </Grid>
                <Grid item xs={2} padding={2}>
                    <Button variant='contained' onClick={() => setDialogOpen(true)}>Show QR Code</Button>
                </Grid>
                <QRCodeDialog open={dialogOpen} closeDialog={() => setDialogOpen(false)} />


            </Grid >
        </Card>
    );
}

export default HeaderSection;
