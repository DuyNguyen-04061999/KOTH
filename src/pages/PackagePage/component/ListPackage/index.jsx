import { Grid, Box, Typography } from "@mui/material";
import { images280423_l } from "../../../../utils/images280423_l";
import { useEffect, useState } from "react";
import _socket from "../../../../redux-saga-middleware/config/socket";

export default function ListPackage(props) {    
  const {data} = props
  const [socket,setSocket] = useState(null)
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  },[socket])
  
  const renderItem = data.map((i, index) => {
    return (
      <Grid className="item-1" item lg={4} md={6} xs={12} key={index}>
        <Box
          className="title"
          sx={{
            background:
              index === 1
                ? "linear-gradient(0deg, rgba(180,74,226,1) 0%, rgba(112,72,232,1) 100%)"
                : "linear-gradient(0deg, rgba(218,163,61,1) 0%, rgba(199,42,89,1) 100%)" &&
                  index === 2
                ? "linear-gradient(0deg,  rgba(112,143,194,1) 0%, rgba(190,40,109,1) 100%)"
                : "linear-gradient(0deg, rgba(218,163,61,1) 0%, rgba(199,42,89,1) 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "50px",
            borderRadius: "5px 5px 0px 0px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: "0px !important", color: "white" }}
          >
            {i.packageName}
          </Typography>
          <hr
            style={{
              color: "white",
              width: "70%",
              margin: "2px",
            }}
          />
          <span className="text-white">{i.packageDescription}</span>
        </Box>
        <Box
          className="bot-desc"
          sx={{
            backgroundColor: "#4a235e",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "0px 0px 5px 5px",
          }}
        >
          <Box
            sx={{
              marginBottom: "35px",
            }}
          >
            <Typography variant="body1" sx={{ color: "#838383", fontWeight:"600", fontSize:"14px" }}>{i.packageDescription}</Typography>
          </Box>
          <Box>
            <button
              onClick={() => {
                socket.emit("buyPackage", {
                  packageId:i?.id
                })
              }}
              style={{
                background:
                  "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                border: "none",
                padding: "7px 55px",
                borderRadius: "5px",
                color: "white",
                display:"flex",
                alignItems:"center"
              }}
            >
              <span>{i.packagePrice}</span>
              <img src={images280423_l.gold} alt="..." width={14} height={14} className="ms-1" />
            </button>
          </Box>
        </Box>
      </Grid>
    );
  });

  return (
    <>
      <Grid container columnSpacing={5} rowSpacing={4}>
        {renderItem}
      </Grid>
    </>
  );
}
