import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import React from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";

const FlipCountDownItem = ({distance}) => {
    const {width} = useWindowDimensions();
    return (
            <FlipClockCountdown
                to={distance && distance}
                labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                labelStyle={{
                    fontSize:width < 1024 ? "2vw" : "1vw",
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    textShadow: "0px 30px 21px rgba(17, 20, 45, 0.71)",
                }}
                digitBlockStyle={{
                    width: width < 1024 ? "6.5vw" :"4vw",
                    height: width < 1024 ? "6.5vw" : "4vw",
                    fontSize:width < 1024 ? "5vw" :"3vw",
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
