import { Dialog, Card, Typography } from '@mui/material'

import React from 'react'
// https://create-react-app.dev/docs/using-the-public-folder/


function QRCodeDialog({closeDialog, open}) {
  
  return (
    <Dialog open={open} 
            onClick={closeDialog}
            fullWidth={true}
            maxWidth={'lg'}
            scroll='body'    
            
        >
            <Card sx={{ 
              padding: 1,
              display:'grid',
              placeItems: 'center'
              

              }}>
                <img 
                  src={`${process.env.PUBLIC_URL}/app-qrcode.png`} 
                  alt="qr code couldn't be displayed"
                  width={'250px'}
                  
                  />

                <Typography variant='h5' textAlign={'center'}
                >Scan the QR Code on your mobile for easy access to this page.</Typography>
            </Card>
        </Dialog>
  )
}

export default QRCodeDialog