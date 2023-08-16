import React, { useEffect, useState } from "react";
import "./index.scss";
import { popup } from "../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import {
  CalculateDistance,
  getTommorowInfo,
} from "../../CountDownTimer/utils/CalculateDistance";
import { updateExpiryTime } from "../../../redux-saga-middleware/reducers/luckyWheelReducer";
export default function CountDownTimer() {
  const [hours, setHour] = useState(null);
  const [minutes, setMinute] = useState(null);
  const [seconds, setSecond] = useState(null);
  const { totalAmount, countEveryday, expiryTime } = useSelector(
    (state) => state.luckyWheelReducer
  );
  
  const dispatch = useDispatch();
  useEffect(() => {
    let timeInterval = setInterval(() => {
      let countdownDate = new Date(expiryTime).getTime();
      let timeNow = new Date().getTime();
      setHour(CalculateDistance(countdownDate, timeNow).hours);
      setMinute(CalculateDistance(countdownDate, timeNow).minutes);
      setSecond(CalculateDistance(countdownDate, timeNow).seconds);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [expiryTime]);
  useEffect(() => {
    if (hours === "00" && minutes === "00" && seconds === "00") {
      dispatch(
        updateExpiryTime(getTommorowInfo().toLocaleDateString() + " 07:00:00")
      );
    }
  }, [seconds, hours, minutes, dispatch]);
  return (
    <div className="CountDownContainer">
      <p>Best amount</p>
      <button style={{ marginTop: "6px", width: "308px", height: "45px" }}>
        <img width={30} className="img-fluid" src={popup.Doge2} alt="..." />
        <span>{totalAmount}</span>
      </button>
      <p>Until Next Round</p>
      <div className="TimeContainer">
        <button style={{ marginTop: "6px" }}>{hours}</button>
        <span>:</span>
        <button style={{ marginTop: "6px" }}>{minutes}</button>
        <span>:</span>
        <button style={{ marginTop: "6px" }}>{seconds}</button>
      </div>
      <div
        disabled={countEveryday === 0 ? true : false}
        className={
          countEveryday === 0 ? "SpinButtonPassive" : "SpinButtonActive"
        }
      >
        SPIN
      </div>
    </div>
  );
}
