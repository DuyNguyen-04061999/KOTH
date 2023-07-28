import { CloseOutlined } from "@mui/icons-material";
import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { popup } from "../../../../utils/images";

export default function BuyTicket() {
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
            maxWidth:"500px"
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
          <Box sx={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            paddingBottom:"10px",
            paddingTop:"10px",
            backgroundColor:"#37285C",
            color:"white",
            paddingLeft:"15px",
            paddingRight:"15px"
          }}>
            <Typography variant="h5">Buy Ticket</Typography>
            <Box>
                <CloseOutlined onClick={handleClose} className="cursor-pointer"/>
            </Box>
          </Box>
          <Box sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
          }}>
            <img src={popup.ticket} alt="..." width={250}/>
            <Box className="p-5 text-white">
                <p> Each ticket equals one gameplay</p>
                <p> Initial purchase at $0.99.</p>
                <p> Subsequent purchases at $2.99</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "50px",
              }}
            >
              <button
                style={{
                  padding: "5px 15px",
                  border: "none",
                  borderRadius: "5px",
                  background:
                      "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                  color: "white",
                }}
              >
                0.99$
              </button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
