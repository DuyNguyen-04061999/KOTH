import { useState } from "react";
import Timer from "./CountDownItem";
import "./index.scss";
import { useEffect } from "react";
import { CalculateDistance } from "./utils/CalculateDistance";
function CountDownTimer({ expiryTime = "June 30, 2023 17:17:00" }) {
  const [number, setNumber] = useState(10);
  const [days, setDay] = useState("00");
  const [hours, setHour] = useState("00");
  const [minutes, setMinute] = useState("00");
  const [seconds, setSecond] = useState("00");
  useEffect(() => {
    setTimeout(() => {
      setNumber(number > 0 ? number - 1 : 60);
    }, 1000);
  }, [number]);
  useEffect(() => {
    let timeInterval = setInterval(() => {
      let countdownDate = new Date(expiryTime).getTime();
      let timeNow = new Date().getTime();
      setDay(CalculateDistance(countdownDate, timeNow).days);
      setHour(CalculateDistance(countdownDate, timeNow).hours);
      setMinute(CalculateDistance(countdownDate, timeNow).minutes);
      setSecond(CalculateDistance(countdownDate, timeNow).seconds);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  });
  return (
    <div className="countdownContainer">
      <div className="ContentCountdown">
        <div>
          <h2>Round 4 Ends in</h2>
          <span style={{ fontWeight: "lighter" }}>
            Each round of Lucky Spins lasts for 5 days. When the time is up for
            one round, the countdown of a new round will start automatically.
          </span>
        </div>
      </div>
      <div className="flipcountdown">
        <div>
          <Timer number={days} active={1} />
          <p>D</p>
        </div>
        <div className="divideDay"></div>
        <div>
          <Timer number={hours} active={2} />
          <p>H</p>
        </div>
        <div className="divideHour">:</div>
        <div>
          <Timer number={minutes} active={3} />
          <p>M</p>
        </div>
        <div className="divideHour">:</div>
        <div>
          <Timer number={seconds} active={4} />
          <p>S</p>
        </div>
      </div>
    </div>
  );
}
export default CountDownTimer;
