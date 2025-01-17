export const getFontSizeDependOnWidth = (width) => {
  if (width > 1200) {
    return "16px";
  } else if (width > 600 && width < 1200) {
    return "16px";
  } else if (width < 600) {
    return "10px";
  }
};
export const getFontSizeButtonDependOnWidth = (width) => {
  if (width > 1200) {
    return "16px";
  } else if (width > 600 && width < 1200) {
    return "17px";
  } else if (width < 600) {
    return "14px";
  }
};

export const getFontSizeTitleDependOnWidth = (width) => {
  if (width > 1200) {
    return "25px";
  } else if (width > 600 && width < 1200) {
    return "21px";
  } else if (width < 600) {
    return "17px";
  }
};
export const getFontSizeBigTitleDependOnWidth = (width) => {
  if (width > 1200) {
    return "30px";
  } else if (width > 600 && width < 1200) {
    return "25px";
  } else if (width < 600) {
    return "21px";
  }
};

export const getPaddingDepenOnWidth = (width) => {
  if (width > 1200) {
    return "15px";
  } else if (width > 600 && width < 1200) {
    return "10px";
  } else if (width < 600) {
    return "5px";
  }
};
export const getIconSizeDependOnWith = (width) => {
  if (width > 1200) {
    return "50px";
  } else if (width > 600 && width < 1200) {
    return "40px";
  } else if (width < 600) {
    return "35px";
  }
};
export const convertToInternationalCurrencySystem = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
};
export const compareDate = (date1, date2) => {
  return (
    new Date(date1).getDate() === new Date(date2).getDate() &&
    new Date(date1).getMonth() === new Date(date2).getMonth() &&
    new Date(date1).getYear() === new Date(date2).getYear()
  );
};

export const compareDateInUSA = (currentDate, startDate, endDate) => {
  console.log(currentDate);
  return (
    new Date(currentDate).getTime() >= new Date(startDate).getTime() &&
    new Date(currentDate).getTime() <= new Date(endDate).getTime()
  );
};
