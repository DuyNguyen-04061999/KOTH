import { CloseOutlined } from "@mui/icons-material";
import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { popup } from "../../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { toggleBuyTicket } from "../../../../redux-saga-middleware/reducers/tournamentReducer";
import { useEffect } from "react";
import { useState } from "react";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { images280423_l } from "../../../../utils/images280423_l";

export default function BuyTicket(props) {
  const { id } = props;
  const { isBuyTicket } = useSelector((state) => state.tournamentReducer);
  const { listPackage } = useSelector((state) => state.appReducer);
  const { type } = useSelector((state) => state.alertReducer);
  const [ticketBuy, setTicketBuy] = useState([]);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleBuyTicket(false));
  };

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
    const tP = listPackage.filter((i) => i.packageName === "Ticket Play");
    setTicketBuy(tP && tP?.length > 0 ? tP[0] : null);
  }, [listPackage]);

  return (
    <Box>
      <Dialog
        open={isBuyTicket}
        onClose={handleClose}
        sx={{
          "& .css-hz1bth-MuiDialog-container": {
            width: "100%",
          },
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            width: "100%",
            borderRadius: 0,
            maxWidth: "500px",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "10px",
              paddingTop: "10px",
              backgroundColor: "#37285C",
              color: "white",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            <Typography variant="h5">Buy Ticket</Typography>
            <Box>
              <CloseOutlined onClick={handleClose} className="cursor-pointer" />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={popup.ticket} alt="..." width={250} />
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
                onClick={() => {
                  socket.emit("buyPackage", {
                    packageId: ticketBuy.id,
                    tournamentId: id,
                  });
                  if (type === "errors") {
                    dispatch(toggleBuyTicket(true));
                  } else {
                    dispatch(toggleBuyTicket(false));
                  }
                }}
                style={{
                  padding: "5px 15px",
                  border: "none",
                  borderRadius: "5px",
                  background:
                    "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                  color: "white",
                }}
              >
                {ticketBuy?.packagePrice}
                <img
                  src={images280423_l.gold}
                  alt="..."
                  width={13}
                  height={13}
                  className="ms-1"
                />
              </button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
