import React, { useState } from "react";
import "./index.scss";
import { images } from "../../../utils/images";
import LuckyWheel from "../../LuckyWheel";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import LuckySpinHistory from "../../Dialog/LuckySpinHistory";
import { useSelector } from "react-redux";
export default function LuckySpinMobile() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { totalAmount } = useSelector((state) => state.luckyWheelReducer);
  return (
    <Box className="LuckySpinMobileContainer">
      <div className="SpinMobileHeader"  onClick={() => navigate("/home")}>
        <img
          src={images.backButton}
          alt="..."
        />
        Lucky Spin
      </div>
      <LuckyWheel />
      <button>SPIN</button>
      <div className="SpinMobileFooter">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <p style={{ color: "#7575c1", fontSize: "12px" }}>SPIN BONUS TOTAL</p>
          <p style={{ color: "white", fontSize: "19px" }}>
            <img
              style={{ width: "20px", marginRight: "10px" }}
              alt="BTD"
              src={images.gold}
            />
            {totalAmount}
          </p>
        </div>
        <div
          style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}
        >
          <div
            className="historySpin"
            onClick={() => {
              setOpen(true);
            }}
          >
            <p style={{ color: "#06fbe8" }}>LUCKY SPIN HISTORY</p>
            <img
              style={{ width: "12px", height: "21px" }}
              src={images.nextButton}
              alt="..."
            />
          </div>
        </div>
      </div>
      <LuckySpinHistory
        open={open}
        handleOnClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
}
