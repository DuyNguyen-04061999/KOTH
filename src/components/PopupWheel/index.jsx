import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { closeLuckyWheelPopup } from "../../redux-saga-middleware/reducers/luckyWheelReducer";
import { images } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";
export default function PopupWheel(props) {
  const { collectedPoint } = useSelector((state) => state.luckyWheelReducer);
  
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  return (
    <div className="PopupWheelContainer">
      <div
        className="popupWheelOverlay"
        onClick={() => {
          dispatch(closeLuckyWheelPopup());
        }}
      ></div>
      <div
        style={{
          width: width < 570 ? "300px" : "350px",
          height: width < 570 ? "300px" : "350px",
          backgroundSize: width < 570 ? "300px 300px" : "350px 350px",
        }}
        className="PopUpWheelContent"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="LuckyBonus" alt="BTD" src={images.LuckyBonus} />
          <button className="CollectedDogeGold">
            <img alt="BTD" src={images.gold} />
            {collectedPoint && collectedPoint > 0 ? <span> + {collectedPoint}</span> : <span> One More Spin !</span>}
          </button>
          <button
            onClick={() => {
              dispatch(closeLuckyWheelPopup());
            }}
            className="CollectButton"
          >
            COLLECT
          </button>
          <img
            alt="BTD"
            onClick={() => {
              dispatch(closeLuckyWheelPopup());
            }}
            className="closeButton"
            src={images.closeButton}
          />
        </div>
      </div>
    </div>
  );
}
