import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../utils/useWindowDimensions";
import "../Slider/index.scss";
// import VideoThumb from "../VideoThumb";
// import { useState } from "react";
import { clickTab, toggleLoginDialog } from "../../redux-saga-middleware/reducers/authReducer";
import { getUniqueID } from "../../utils/helper";
export default function GameThumb(props) {
  const { id, name, img, title } = props;
  const { width } = useWindowDimensions();
  const { token } = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="new">
        <div>
          {/* {showVideo === true && cardId === id ? (
            <VideoThumb video={video} isPlaying={isPlaying}/>
          ) : ( */}
          <div
            id={id}
            className="card-item cursor-pointer"
            style={{
              width: width > 576 ? 150 : 102,
              height: width > 576 ? 150 : 102,
            }}
            onClick={() => {
              if (token) {
                const params = new URLSearchParams();
                params.append("clientKey", getUniqueID());
                navigate({
                  pathname: `/gamelobby/${id}`,
                  // search: `?${params.toString()}`
                });
              } else {
                dispatch(toggleLoginDialog());
                dispatch(clickTab("login"))
              }
            }}
          >
            <div className="box">
              <img src={img ? img : ""} alt={name} />
            </div>
          </div>
          {/* )} */}
          {title && (
            <img src={title ? title : ""} alt="..." className="theme-pvp" />
          )}
        </div>
      </div>
    </>
  );
}
