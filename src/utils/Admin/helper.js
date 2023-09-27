function checkRouteIsManage(pathname) {
  if (pathname === "/manage") return true;
  return false;
}

function checkRouteIsCreate(pathname) {
  if (pathname === "/" || pathname === "" || pathname === "/create")
    return true;
  return false;
}

function trimAndCamelCase(inputString) {

  const words = inputString.trim().split(/\s+/);

  if (words.length === 0) {
    return "";
  }

  const camelCasedWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  const camelCaseString = camelCasedWords.join("");

  return camelCaseString;
}

export { checkRouteIsManage, checkRouteIsCreate, trimAndCamelCase };
