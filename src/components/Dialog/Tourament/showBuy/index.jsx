import { Box, Dialog } from "@mui/material";
import React, { useState } from "react";

export default function TouramentShow() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <button onClick={handleClickOpen}>next</button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .css-hz1bth-MuiDialog-container": {
            width: "100%",
          },
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            width: "100%",
            borderRadius: 0,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: 0,
            backgroundColor: "#2e233d",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box className="p-5 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            pulvinar placerat nunc ac ultricies. Nulla ac aliquam est. Sed
            congue posuere nibh in tempus. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Nulla id
            ornare urna. Pellentesque habitant morbi tristique senectus et netus
            et malesuada fames ac turpis egestas. Phasellus mi felis, rhoncus et
            congue eget, convallis vel velit. Nulla euismod vel ante eget
            varius.
          </Box>
          <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            paddingBottom:"50px"
          }}>
            <button style={{
                padding:"5px 15px",
                border:"none",
                borderRadius:"5px",
                backgroundColor:"#68399E",
                color:"white"
            }}>Cancel</button>
            <button style={{
                padding:"5px 25px",
                border:"none",
                borderRadius:"5px",
                backgroundColor:"#843eed",
                color:"white",
                marginLeft:"30px"
            }}>Buy</button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
