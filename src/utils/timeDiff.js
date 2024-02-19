const calculateSecondDifference = (startTime, currentTime) => {
  return (new Date(currentTime) - new Date(startTime)) / 1000;
};
export const secondNotiComparison = (startTime, currentTime) => {
  return calculateSecondDifference(startTime, currentTime) <
    process.env.REACT_APP_SECOND_NOTI
    ? true
    : false;
};
