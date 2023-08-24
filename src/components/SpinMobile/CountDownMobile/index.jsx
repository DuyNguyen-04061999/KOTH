import React from "react";
import "./index.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  CalculateDistance,
  getTommorowInfo,
} from "../../CountDownTimer/utils/CalculateDistance";
import { updateExpiryTime } from "../../../redux-saga-middleware/reducers/luckyWheelReducer";
import _socket from "../../../redux-saga-middleware/config/socket";
export default function CountDownMobile() {
  const [hours, setHour] = useState("00");
  const [minutes, setMinute] = useState("00");
  const [seconds, setSecond] = useState("00");
  const [socket, setSocket] = useState(null);
  const { expiryTime } = useSelector((state) => state.luckyWheelReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

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

  useEffect(() => {
    socket?.on("storeSpinHistorySuccess", (data) => {
      console.log(123);
      if (hours === "00" && minutes === "00" && seconds === "00") {
        dispatch(
          updateExpiryTime(getTommorowInfo().toLocaleDateString() + " 07:00:00")
        );
      }
    });

    return () => {
      // socket?.off()
    };
  }, [socket, seconds, hours, minutes, dispatch])
  return (
    <div className="timeleftButton">
      <p>Time Left</p>
      <div style={{ margin: "-4px" }}>
        <span>{hours}</span>
        <span>:</span>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
    </div>
  );
}
