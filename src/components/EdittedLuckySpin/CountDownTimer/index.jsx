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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 30 30"
        >
          <g>
            <path
              fill="#20093B"
              d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15z"
            ></path>
            <g>
              <path
                fill="#FFE14D"
                d="M15 25c5.523 0 10-4.477 10-10S20.523 5 15 5 5 9.477 5 15s4.477 10 10 10z"
              ></path>
              <path
                fill="#FB3"
                d="M25 15c0-5.514-4.486-10-10-10v20c5.514 0 10-4.486 10-10z"
              ></path>
              <g>
                <g>
                  <path
                    fill="#FB3"
                    d="M15 22.617c-4.2 0-7.617-3.417-7.617-7.617S10.8 7.383 15 7.383 22.617 10.8 22.617 15 19.2 22.617 15 22.617z"
                  ></path>
                </g>
              </g>
              <path
                fill="#E68A2E"
                d="M22.617 15c0-4.2-3.417-7.617-7.617-7.617v15.234c4.2 0 7.617-3.417 7.617-7.617z"
              ></path>
              <g>
                <path
                  fill="#FFE14D"
                  d="M15.586 14.455v-2.317c.674.165 1.172.599 1.172 1.097a.586.586 0 101.172 0c0-1.132-1.008-2.078-2.344-2.296v-.633a.586.586 0 10-1.172 0v.633c-1.336.218-2.344 1.164-2.344 2.296 0 1.133 1.008 2.079 2.344 2.297v2.316c-.674-.165-1.172-.599-1.172-1.097a.586.586 0 10-1.172 0c0 1.132 1.008 2.079 2.344 2.296v.64a.586.586 0 101.172 0v-.64c1.336-.217 2.344-1.164 2.344-2.296s-1.008-2.079-2.344-2.296zm-2.344-1.22c0-.498.498-.932 1.172-1.097v2.195c-.674-.166-1.172-.6-1.172-1.098zm2.344 4.613v-2.194c.674.165 1.172.599 1.172 1.097s-.498.932-1.172 1.097z"
                ></path>
              </g>
              <path
                fill="#FB3"
                d="M15.586 19.687v-.639c1.336-.217 2.344-1.164 2.344-2.296s-1.008-2.079-2.344-2.296v-2.317c.674.165 1.172.599 1.172 1.097a.586.586 0 101.172 0c0-1.132-1.008-2.078-2.344-2.296v-.633A.586.586 0 0015 9.72v10.552a.586.586 0 00.586-.586zm0-4.032c.674.165 1.172.598 1.172 1.097 0 .498-.498.932-1.172 1.097v-2.194z"
              ></path>
            </g>
          </g>
        </svg>
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
