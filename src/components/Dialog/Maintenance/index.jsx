import { Box, Dialog } from '@mui/material';
import React, { useState } from 'react';
import BannerHomePage from '../../../pages/NewHomePageComponent/NewHomePage/BannerHomePage';

export default function Maintenance() {
    const [bannerCountDown, setBannerCountDown] = useState(true);
    return (
        <Dialog open={true} fullScreen={true}sx={{
            height: "100%"
        }} PaperProps={{
            style: {
                height: "100%",
            },
          }}>
            <Box component={"div"} className='d-flex justify-content-center align-items-center' sx={{
                height: "100%",
                background: "#68399E"
            }}>
                {bannerCountDown && <BannerHomePage setBannerCountDown={setBannerCountDown} />}
            </Box>
            
        </Dialog>
    )
}
