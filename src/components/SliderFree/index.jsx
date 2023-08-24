import "../Slider/index.scss";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../../utils/helper";

export default function SliderFree({ cards }) {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const cardsList = cards.map((e, index) => {
    return (
      <div key={index} className="new">
        <div
          id={e.id}
          className="card-item cursor-pointer"
          // style={{
          //   width: width > 576 ? 200 : 102,
          //   height: width > 576 ? 200 : 102,
          // }}
          onClick={() => {
            const params = new URLSearchParams();
            params.append("clientKey", getUniqueID());
            navigate({
              pathname: `/gamelobby/${e.id}`,
              // search: `?${params.toString()}`
            });
          }}
        >
          <div className="box" style={{}}>
            {width > 576 ? (
              <img
                src={
                  e?.gameAvatar
                    ? process.env.REACT_APP_SOCKET_SERVER + "/" + e.gameAvatar
                    : ""
                }
                alt={e.gameName}
                style={{ width: "150px", height: "150px" }}
              />
            ) : (
              <img
                src={
                  e?.gameAvatar
                    ? process.env.REACT_APP_SOCKET_SERVER + "/" + e.gameAvatar
                    : ""
                }
                alt={e.gameName}
              />
            )}
          </div>
        </div>
        {e?.gameTypeIcon && (
          <img 
            src={
              e?.gameTypeIcon
                ? process.env.REACT_APP_SOCKET_SERVER + "/" + e?.gameTypeIcon
                : ""
            }
            alt="..."
            className="theme-pvp"
          />
        )}
      </div>
    );
  });

  return (
    <div
      className="slider"
      style={
        {
          // paddingLeft: width > 576 ? 0 : 0,
        }
      }
    >
      <div className="scrolling-carousel-example1-container">
        <ScrollingCarousel>{cardsList}</ScrollingCarousel>
      </div>
    </div>
  );
}
