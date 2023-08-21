import { useEffect, useState } from "react";
import "./index.scss";
import $ from "jquery";
import _socket from "../../redux-saga-middleware/config/socket.js";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux-saga-middleware/reducers/alertReducer";
import { images } from "../../utils/images";
import {
  assigntotalAmount,
  openLuckyWheelPopup,
} from "../../redux-saga-middleware/reducers/luckyWheelReducer";
import useWindowDimensions from "../../utils/useWindowDimensions";
import CountDownMobile from "../SpinMobile/CountDownMobile";

export default function LuckyWheel(props) {
  const [config, setConfig] = useState(null);
  const [listReward, setListReward] = useState([]);
  const { width } = useWindowDimensions();
  const [buttonState, SetButtonState] = useState(true);
  const [isFetchReward, setIsFetchListReward] = useState(true);
  const [isFetchListRh, setIsFetchListRh] = useState(true);
  const { token } = useSelector((state) => state.authReducer);
  const { countEveryday } = useSelector((state) => state.luckyWheelReducer);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFetchReward && token)
      socket?.emit("getLuckySpinConfig", { type: "dogegold" });
    if (isFetchListRh && token)
      socket?.emit("getRewardHistory", { type: "luckyspin" });
    socket?.on("getLuckySpinConfigSuccess", (data) => {
      setConfig(data);
      setListReward(data?.LuckySpinReward);
      setIsFetchListReward(false);
      dispatch(assigntotalAmount(data.total));
    });

    socket?.on("getRewardHistorySuccess", (data) => {
      setIsFetchListRh(false);
    });

    return () => {
      // socket?.off()
    };
  }, [socket, dispatch, isFetchListRh, isFetchReward, token]);
  function getRandomValueByPercent(arr, random) {
    let cumulativePercentage = 0;
    const cumulativePercentages = arr.map((obj) => {
      cumulativePercentage += parseFloat(obj.lsrPercent) / 100;
      return cumulativePercentage;
    });

    for (let i = 0; i < cumulativePercentages.length; i++) {
      if (random / 10 <= cumulativePercentages[i]) {
        return arr[i].lsrValue;
      }
    }

    return 0;
  }

  const setDegreeforWheel = (deg, randomNum, value) => {
    $(function () {
      $(".circle").animate(
        { deg: deg * -1 + 360 * randomNum },
        {
          duration: 3000,
          step: function (now) {
            $(this).css({
              transform: "rotate(" + now + "deg)",
            });
          },
        }
      );
    });
  };

  const getIndex = (value) => {
    for (let index = 0; index < listReward?.length; index++) {
      const element = listReward[index];
      if (value === element?.lsrValue) {
        return index;
      }
    }
  };

  const startRotation = () => {
    if (token) {
      if (countEveryday > 0 && buttonState === true) {
        SetButtonState(false);
        let randomNum = handleOnClickGoButton(0, 11);
        const value = getRandomValueByPercent(listReward, randomNum);
        let degree = getIndex(value) * 30 + 15;
        setDegreeforWheel(degree, randomNum, value);
        setTimeout(() => {
          dispatch(openLuckyWheelPopup(value));
          socket?.emit("storeSpinHistory", {
            value,
            type: "dogegold",
            moneyId: config?.id,
          });
          SetButtonState(true);
        }, 3000);
      }
    } else {
      dispatch(showAlert("error", "Please Login !!!"));
    }
  };

  const handleOnClickGoButton = (min, max) => {
    const random = Math.floor(Math.random() * (max - min)) + min;
    return random;
  };
  return (
    <div className="bigLuckyWheelContainer">
      <div className="wheelBG">
        <ul className="circle">
          {listReward?.map((item, index) => {
            return index % 2 === 0 ? (
              <li
                key={index}
                style={{ transform: `rotate(${index * 30}deg) skewY(-60deg)` }}
              >
                <div
                  style={{
                    backgroundColor: "#571f96",
                    fontSize: "10px",
                  }}
                  className="textContent"
                >
                  <span>
                    {item?.lsrValue === 0 ? "One More" : item?.lsrValue}
                  </span>
                </div>
              </li>
            ) : (
              <li
                key={index}
                style={{ transform: `rotate(${index * 30}deg) skewY(-60deg)` }}
              >
                <div
                  style={{
                    backgroundColor: "#8342c3",
                    fontSize: "10px",
                  }}
                  className="textContent"
                >
                  <span>
                    {item?.lsrValue === 0 ? "One More" : item?.lsrValue}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <span className="spinButton" onClick={startRotation}>
          <img alt="" src={images.SpinButton} />{" "}
        </span>
        <img
          className="LuckySpinSlogan"
          alt="BTD"
          src={images.LuckySlogan}
          style={{
            width: "100%",
          }}
        />
        <div className="spinBorder"></div>
        <img alt="BTD" className="spinBorderBG" src={images.Ellipse} />
      </div>{" "}
      <div
        onClick={startRotation}
        style={{ position: "absolute", bottom: "18px", right: "580px" }}
        className={
          countEveryday > 0 && buttonState === true
            ? "SpinButtonActive"
            : "SpinButtonPassive"
        }
      >
        SPIN
      </div>
      {/* {width < 700 && <button className="SpinButtonMobile">SPIN</button>} */}
      {width < 700 &&
        (countEveryday === 0 ? (
          <CountDownMobile />
        ) : (
          <button
            style={{
              backgroundImage:
                countEveryday > 0 && buttonState === true
                  ? ""
                  : "linear-gradient(#9487a5,#685d83)",
            }}
            onClick={startRotation}
            className="SpinButtonMobile"
          >
            SPIN
          </button>
        ))}
    </div>
  );
}
