import { Box } from "@mui/material";
import React, { useState } from "react";
import ReferralMedal from "./ReferralMedal";
import { medalListIcon } from "../../../../utils/ReferralMedal";
import ReferralReward from "./ReferralReward";

export default function ReferralMedalSection() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      {" "}
      <Box
        sx={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {medalListIcon?.map((item, index) => {
          return (
            <Box
              sx={{ cursor: "pointer" }}
              key={index}
              onClick={() => {
                setSelected(index);
              }}
            >
              <ReferralMedal
                selected={selected}
                index={index}
                imgSrc={item.src}
                gradient={item.gradient}
                name={item.name}
              />
              <Box
                sx={{
                  display: selected === index ? "flex" : "none",
                  justifyContent: "center",
                }}
              >
                {" "}
                <Box
                  sx={{
                    width: "0px",
                    height: "0px",
                    borderStyle: "solid",
                    borderWidth: "0 12.5px 21.7px 12.5px",
                    borderColor: "transparent transparent #0F041D transparent",
                    transform: "rotate(0deg)",
                  }}
                ></Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      <ReferralReward name={medalListIcon[selected].name} />
    </>
  );
}
