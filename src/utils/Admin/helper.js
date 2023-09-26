function checkRouteIsManage(pathname) {
  if (pathname === "/manage") return true;
  return false;
}

function checkRouteIsCreate(pathname) {
    if (pathname === "/" || pathname === "" || pathname === "/create") return true;
    return false;
  }

export { checkRouteIsManage, checkRouteIsCreate };
