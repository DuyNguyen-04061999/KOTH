import "../Slider/index.scss";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import useWindowDimensions from "../../utils/useWindowDimensions";
import GameThumb from "../GameThumb";
import { Box } from "@mui/material";

export default function SliderLayout({ cards }) {
  const { width } = useWindowDimensions();
  return (
    <div
      className="slider"
      style={{
        paddingLeft: width > 576 ? 0 : 0,
      }}
    >
      <div className="scrolling-carousel-example1-container">
        <ScrollingCarousel>
          {cards && cards?.length > 0 ? (
            cards?.map((card, i_card) => (
              <div style={{}} key={i_card}>
                <GameThumb
                  title={
                    card?.gameTypeIcon
                      ? process.env.REACT_APP_SOCKET_SERVER +
                        "/" +
                        card.gameTypeIcon
                      : ""
                  }
                  id={card.id}
                  name={card.gameName}
                  img={
                    card?.gameAvatar
                      ? process.env.REACT_APP_SOCKET_SERVER +
                        "/" +
                        card.gameAvatar
                      : ""
                  }
                  description={card.gameDescription}
                  Gamename={card.gameName}
                  titleGame={card.gameType}
                />
              </div>
            ))
          ) : (
            <Box className="text-white ms-1">Not Data Yet!</Box>
          )}
        </ScrollingCarousel>
      </div>
    </div>
  );
}
