import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReferralMedal from "./ReferralMedal";
import { medalListIcon } from "../../../../utils/ReferralMedal";
import ReferralReward from "./ReferralReward";
import { useSelector } from "react-redux";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

export default function ReferralMedalSection() {
  const [selected, setSelected] = useState("Bronze");
  const { currentLevel } = useSelector((state) => state.referralReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  useEffect(() => {
    setSelected(currentLevel?.nextTierName || "Bronze");
  }, [currentLevel]);
  const { orientation } = useSelector((state) => state.gameReducer);
  const mobileCondition = () => {
    return (
      device === "Mobile" || (device === "Tablet" && orientation === "portrait")
    );
  };
  return (
    <>
      <Box
        sx={{
          marginTop: "24px",
          marginBottom: mobileCondition() ? "24px" : "",
          display: mobileCondition() ? "" : "flex",
          justifyContent: "space-between",
        }}
      >
        {mobileCondition() ? (
          <Box>
            <ScrollingCarousel className="scrolling-carousel-example1-container">
              {medalListIcon?.map((item, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => {
                      setSelected(item?.name);
                    }}
                    sx={{ padding: "10px" }}
                  >
                    <ReferralMedal
                      selected={selected}
                      index={index}
                      imgSrc={item.src}
                      gradient={item.gradient}
                      name={item.name}
                    />
                  </Box>
                );
              })}
            </ScrollingCarousel>
          </Box>
        ) : (
          medalListIcon?.map((item, index) => {
            return (
              <Box
                sx={{ cursor: "pointer" }}
                key={index}
                onClick={() => {
                  setSelected(item?.name);
                }}
              >
                <ReferralMedal
                  selected={selected}
                  index={index}
                  imgSrc={item.src}
                  gradient={item.gradient}
                  name={item.name}
                />
                {mobileCondition() ? (
                  ""
                ) : (
                  <Box
                    sx={{
                      display: selected === item?.name ? "flex" : "none",
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
                        borderColor:
                          "transparent transparent #0F041D transparent",
                        transform: "rotate(0deg)",
                      }}
                    ></Box>
                  </Box>
                )}
              </Box>
            );
          })
        )}
      </Box>
      <ReferralReward name={selected} />
    </>
  );
}
