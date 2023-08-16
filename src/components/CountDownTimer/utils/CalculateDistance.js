export const CalculateDistance = (countdownDate, timeNow) => {
  const distance = countdownDate - timeNow;
  if (distance <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return {
    days: days / 10 < 1 ? "0" + days : days,
    hours: hours / 10 < 1 ? "0" + hours : hours,
    minutes: minutes / 10 < 1 ? "0" + minutes : minutes,
    seconds: seconds / 10 < 1 ? "0" + seconds : seconds,
  };
};
export const getTommorowInfo = () => {
  let day = new Date();
  let nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);
  return nextDay;
};
