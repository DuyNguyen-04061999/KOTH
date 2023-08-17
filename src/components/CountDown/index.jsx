import { useState, useEffect } from "react";
import "./index.scss";

function CountdownTimer() {
  const [expiryTime, setExpiryTime] = useState("5 may 2023 15:30:25");
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: "",
    countdownHours: "",
    countdownMinutes: "",
    countdownSeconds: "",
  });

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);
      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        clearTimeout(timeInterval);
        setExpiryTime(false);
      }
    }, 1000);
  };

  useEffect(() => {
    countdownTimer();
  });

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="btn-group my-3">
          {expiryTime !== false ? (
            <>
              <button>{countdownTime.countdownDays} </button>
              <button>{countdownTime.countdownHours} </button>
              <button>{countdownTime.countdownMinutes}</button>
              <button>{countdownTime.countdownSeconds} </button>
            </>
          ) : (
            <p>Deal has been Expired</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default CountdownTimer;
