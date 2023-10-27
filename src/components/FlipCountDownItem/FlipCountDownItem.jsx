import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import React from "react";
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import {Box} from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";

const FlipCountDownItem = ({distance}) => {
    const {width} = useWindowDimensions();
    return (
            <FlipClockCountdown
                to={distance && distance}
                labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                labelStyle={{
                    fontSize: width < 576 ? "8px" : "16px",
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    textShadow: "0px 30px 21px rgba(17, 20, 45, 0.71)",
                }}
                digitBlockStyle={{
                    width: width < 576 ?  `${width / 20}px` : "70px",
                    height: width < 576 ? `${width / 20}px` : "70px",
                    fontSize: width < 576 ? "20px" : "40px",
                    fontWeight: 800,
                    backgroundColor: "#6e0aa1",
                    textShadow: "0px 30px 21px rgba(17, 20, 45, 0.71)"
                }}
                dividerStyle={{height:"0px"}}
                separatorStyle={{color: 'transparent'}}
                duration={0.6}
            >
            </FlipClockCountdown>
    );
};

export default FlipCountDownItem;
