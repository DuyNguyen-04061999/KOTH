export const detectDevice = () => {
  if (
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 0) ||
    navigator.platform === "iPad"
  ) {
    return "Tablet";
  } else if (
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      navigator.userAgent.toLowerCase()
    )
  ) {
    return "Tablet";
  } else if (
    navigator.userAgent.match(
      /Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i
    )
  ) {
    return "Mobile";
  } else {
    return "Desktop";
  }
};
export const generateRandom = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};
