export const detectDevice = () => {
  console.log(navigator.userAgent.toLowerCase(), "detect");
  if (
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
