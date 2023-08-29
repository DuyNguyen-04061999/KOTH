import { useLocation, useNavigate } from "react-router";
import "../NavTablet/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import _socket from "../../../redux-saga-middleware/config/socket";
import { showDropdown } from "../../../redux-saga-middleware/reducers/authReducer";

export default function NavTablet() {
  const navigatr = useNavigate();
  const dispatch = useDispatch();
  const { token, isNav, isDropdownNav } = useSelector(
    (state) => state.authReducer
  );
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const location = useLocation();
  const { pathname } = location;

  const toggleDropdown = () => {
    dispatch(showDropdown(false));
  };
  return (
    <>
      <Box className="nav-section">
        <Box
          sx={{
            backgroundColor: "#2e233d",
            color: "#9485b8",
            height: "95vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "9px",
            transitionDuration: "all 1s",
            paddingLeft: isNav === true ? "30px" : "20px",
            paddingRight: isNav === true ? "30px" : "20px",
            transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          }}
          className="pt-3 pb-3 nav-animate"
        >
          <Box className="mt-3">
            {getAppType() === "promote" ? (
              <Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("home")
                        ? "#7648ED"
                        : "#462A71",

                    borderRadius: "5px",
                    color:
                      pathname && pathname?.includes("home")
                        ? "white"
                        : "#A89CD7",
                  }}
                  onClick={() => {
                    navigate("/home");
                  }}
                  className="nav-home pt-2 pb-2 ps-2 mb-3"
                >
                  {pathname && pathname?.includes("home") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 18 18"
                      className="p-1 me-1"
                    >
                      <g>
                        <path
                          fill="#fff"
                          d="M15.03 5.116l-4.32-3.022c-1.177-.825-2.985-.78-4.117.097L2.835 5.124c-.75.585-1.342 1.785-1.342 2.73v5.175A3.473 3.473 0 004.958 16.5h8.085a3.466 3.466 0 003.465-3.465V7.951c0-1.012-.653-2.257-1.478-2.835zm-5.467 8.385a.567.567 0 01-.563.563.567.567 0 01-.562-.563v-2.25c0-.307.255-.562.562-.562.308 0 .563.255.563.562v2.25z"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="p-1 me-1"
                    >
                      <g>
                        <path
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 17.99v-3M9.02 2.84l-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12z"
                        ></path>
                      </g>
                    </svg>
                  )}

                  <span
                    className="hover-nav"
                    style={{
                      display: isNav === true ? "block" : "none",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginLeft: "5px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Home
                  </span>
                </Box>
                <hr
                  style={{
                    color: "white",
                    border: "2",
                    background: "white",
                    borderColor: "white",
                    height: "3px",
                  }}
                />
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "space-between" : "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("asdasfsd")
                        ? "#7648ED"
                        : "#462A71",

                    borderRadius: "5px",
                  }}
                  onClick={toggleDropdown}
                  className="nav-home pt-2 pb-2 ps-2"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {pathname && pathname?.includes("week") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="p-1 me-1"
                      >
                        <path
                          stroke="#A89CD7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12.15 16.5v2.1"
                        ></path>
                        <path
                          stroke="#A89CD7"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                          d="M7.15 22h10v-1c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v1z"
                        ></path>
                        <path
                          stroke="#A89CD7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M6.15 22h12M12 16c-3.87 0-7-3.13-7-7V6c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v3c0 3.87-3.13 7-7 7z"
                        ></path>
                        <path
                          stroke="#A89CD7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M5.47 11.65c-.75-.24-1.41-.68-1.93-1.2-.9-1-1.5-2.2-1.5-3.6s1.1-2.5 2.5-2.5h.65c-.2.46-.3.97-.3 1.5v3c0 1 .21 1.94.58 2.8zm13.06 0c.75-.24 1.41-.68 1.93-1.2.9-1 1.5-2.2 1.5-3.6s-1.1-2.5-2.5-2.5h-.65c.2.46.3.97.3 1.5v3c0 1-.21 1.94-.58 2.8z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="p-1 me-1"
                      >
                        <path
                          stroke="#A89CD7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12.15 16.5v2.1"
                        ></path>
                        <path
                          stroke="#A89CD7"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                          d="M7.15 22h10v-1c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v1z"
                        ></path>
                        <path
                          stroke="#A89CD7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M6.15 22h12M12 16c-3.87 0-7-3.13-7-7V6c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v3c0 3.87-3.13 7-7 7z"
                        ></path>
                        <path
                          stroke="#A89CD7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M5.47 11.65c-.75-.24-1.41-.68-1.93-1.2-.9-1-1.5-2.2-1.5-3.6s1.1-2.5 2.5-2.5h.65c-.2.46-.3.97-.3 1.5v3c0 1 .21 1.94.58 2.8zm13.06 0c.75-.24 1.41-.68 1.93-1.2.9-1 1.5-2.2 1.5-3.6s-1.1-2.5-2.5-2.5h-.65c.2.46.3.97.3 1.5v3c0 1-.21 1.94-.58 2.8z"
                        ></path>
                      </svg>
                    )}
                    <span
                      className="hover-nav"
                      style={{
                        display: isNav === true ? "block" : "none",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "15px",
                        marginLeft: "5px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Tournament
                    </span>
                  </Box>
                  <Box>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 14 14"
                      className="me-2"
                      style={{
                        transform:
                          isDropdownNav === true
                            ? "rotate(0deg)"
                            : "rotate(-88deg)",
                        transition: "all 0.3s",
                      }}
                    >
                      <g clipPath="url(#clip0_2059_14801)">
                        <g>
                          <g>
                            <path
                              fill="#A89CD7"
                              d="M6.997 8.348l5.238-5.237a.76.76 0 01.541-.223.76.76 0 01.542.223l.458.46a.76.76 0 01.224.54.76.76 0 01-.224.542L7.54 10.89a.76.76 0 01-.543.223.76.76 0 01-.543-.223l-6.23-6.23A.76.76 0 010 4.117a.76.76 0 01.224-.541l.458-.46a.767.767 0 011.083 0l5.232 5.232z"
                            ></path>
                          </g>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_2059_14801">
                          <path
                            fill="#fff"
                            d="M0 0H14V14H0z"
                            transform="matrix(0 -1 -1 0 14 14)"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: isDropdownNav === true ? "block" : "none",
                    height: isDropdownNav === true ? "220px" : "0px",
                    transition: "all 0.5s",
                  }}
                  className={`dropdown-content ${
                    isDropdownNav === true ? "show" : ""
                  }`}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isNav === true ? "flex-start" : "center",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("hot-tournament")
                          ? "#7648ED"
                          : "transparent",

                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/hot-tournament");
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-2"
                  >
                    {pathname && pathname?.includes("hot-tournament") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 18 18"
                        className="p-1 me-1"
                      >
                        <g clipPath="url(#clip0_2061_8161)">
                          <path
                            fill="#fff"
                            d="M13.967 5.763a.527.527 0 00-.836.136c-.263.512-.597.981-.99 1.397.039-.3.058-.602.058-.905 0-.58-.077-1.178-.23-1.776A7.135 7.135 0 008.336.06a.527.527 0 00-.768.427 6.055 6.055 0 01-2.524 4.456l-.058.042c-.04.029-.077.057-.112.08a7.185 7.185 0 00-2.213 2.552 7.052 7.052 0 00-.56 5.03A7.122 7.122 0 009 18c3.931 0 7.13-3.198 7.13-7.13a7.07 7.07 0 00-2.162-5.107z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_2061_8161">
                            <path fill="#fff" d="M0 0H18V18H0z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 18 18"
                        className="p-1 me-1"
                      >
                        <g>
                          <path
                            fill="#9B8DCA"
                            stroke="#9B8DCA"
                            strokeWidth="0.5"
                            d="M7.546 1.413c-.113 1.518-.853 2.894-2.025 3.78h0l-.042.032a10.28 10.28 0 01-.009.007h0a2.22 2.22 0 01-.085.064h0a.787.787 0 00-.02.015h-.001a6.55 6.55 0 00-1.923 2.35h0a6.804 6.804 0 00-.49 4.64h0c.707 2.905 3.189 4.949 6.05 4.949 3.458 0 6.249-2.968 6.249-6.587 0-1.787-.67-3.462-1.89-4.715h0l-.603-.198s0 0 0 0a.696.696 0 00-.505.384h0c-.093.19-.196.373-.31.548 0 0 0 0 0 0 0-.538-.068-1.089-.201-1.638h0C11.3 3.233 10.143 1.697 8.56.833m-1.015.58l.25.019m-.25-.019l.25.019m-.25-.019a.721.721 0 01.35-.57h0a.673.673 0 01.666-.01m-.767.599c-.118 1.586-.892 3.03-2.123 3.96l2.35-4.333m-.227.373a.471.471 0 01.227-.373m.54-.226l-.12.22m.12-.22s0 0 0 0l-.12.22m0 0a.423.423 0 00-.42.006m.42-.007c1.517.829 2.631 2.305 3.056 4.05L8.022 1.06M6.301 6.384h0l-.003.002A5.122 5.122 0 004.68 8.308a5.333 5.333 0 00-.383 3.641l2.004-5.565zm0 0l.039-.03m-.04.03l-.152-.198.041-.032.151.2m0 0s0 0 0 0m0 0h0m0 0a6.588 6.588 0 002.405-3.676 5.191 5.191 0 011.65 2.717c.107.437.16.87.16 1.286a5.39 5.39 0 01-.316 1.81M6.34 6.354l3.899 2.139m0 0s0 0 0 0l.236.083-.236-.083zm0 0a.736.736 0 00.208.801h0m-.208-.801l.208.801m0 0c.232.2.563.222.819.052h0m-.82-.052l.82.052m0 0a6.425 6.425 0 001.696-1.664 5.3 5.3 0 01.9 2.982c0 2.852-2.194 5.15-4.862 5.15-2.207 0-4.147-1.58-4.703-3.864l6.969-2.604z"
                          ></path>
                        </g>
                      </svg>
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: isNav === true ? "block" : "none",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "15px",
                        marginLeft: "5px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Hot tour
                    </span>
                  </Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isNav === true ? "flex-start" : "center",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("hourly-tournament")
                          ? "#7648ED"
                          : "transparent",

                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/hourly-tournament");
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-2"
                  >
                    {pathname && pathname?.includes("hourly-tournament") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 16 18"
                        className="p-1 me-1"
                      >
                        <g fill="#fff">
                          <path d="M13.453 5.358L14.53 4.28l-1.06-1.06-1.153 1.152A7.452 7.452 0 008.75 3.038V1.5h1.5V0h-4.5v1.5h1.5v1.538a7.453 7.453 0 00-3.567 1.334L2.53 3.22 1.47 4.28l1.077 1.078a7.5 7.5 0 1010.905 0zM8 16.5a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path>
                          <path d="M8 6v4.5H3.5A4.5 4.5 0 108 6z"></path>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 16 18"
                        className="p-1 me-1"
                      >
                        <g fill="#A89CD7">
                          <path d="M13.453 5.358L14.53 4.28l-1.06-1.06-1.153 1.152A7.452 7.452 0 008.75 3.038V1.5h1.5V0h-4.5v1.5h1.5v1.538a7.453 7.453 0 00-3.567 1.334L2.53 3.22 1.47 4.28l1.077 1.078a7.5 7.5 0 1010.905 0zM8 16.5a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path>
                          <path d="M8 5.25a.75.75 0 00-.75.75v3.75H3.5a.75.75 0 00-.75.75A5.25 5.25 0 108 5.25zm0 9a3.757 3.757 0 01-3.675-3H8a.75.75 0 00.75-.75V6.825A3.75 3.75 0 018 14.25z"></path>
                        </g>
                      </svg>
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: isNav === true ? "block" : "none",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "15px",
                        marginLeft: "5px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Hourly tour
                    </span>
                  </Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isNav === true ? "flex-start" : "center",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("daily-tournament")
                          ? "#7648ED"
                          : "transparent",

                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/daily-tournament");
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-3"
                  >
                    {pathname && pathname?.includes("daily-tournament") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 18 18"
                        className="p-1 me-1"
                      >
                        <g fill="#fff">
                          <path d="M13.5 2.715V1.8a.9.9 0 10-1.8 0v.9H9.9v-.9a.9.9 0 00-1.8 0v.9H6.3v-.9a.9.9 0 00-1.8 0v.915A3.731 3.731 0 00.916 6.3h16.171a3.731 3.731 0 00-3.585-3.585z"></path>
                          <path d="M.9 8.1v5.26a3.746 3.746 0 003.742 3.74h8.717a3.746 3.746 0 003.741-3.74V8.1H.9z"></path>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        className="p-1 me-1"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <g>
                          <path
                            fill="#A89CD7"
                            d="M13.5 1.815V1.8a.9.9 0 10-1.8 0H9.9a.9.9 0 00-1.8 0H6.3a.9.9 0 00-1.8 0v.015A3.738 3.738 0 00.9 5.54v7.818A3.746 3.746 0 004.642 17.1h8.717a3.746 3.746 0 003.741-3.74V5.54a3.738 3.738 0 00-3.6-3.725zM2.7 5.54a1.936 1.936 0 011.8-1.926.9.9 0 101.8-.015h1.8a.9.9 0 101.8 0h1.8a.9.9 0 001.8.015 1.936 1.936 0 011.8 1.926v.76H2.7v-.76zm10.66 9.76H4.641A1.943 1.943 0 012.7 13.358V8.1h12.6v5.26a1.944 1.944 0 01-1.94 1.94z"
                          ></path>
                        </g>
                      </svg>
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: isNav === true ? "block" : "none",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "15px",
                        marginLeft: "5px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Daily tour
                    </span>
                  </Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isNav === true ? "flex-start" : "center",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("week-long-tournament")
                          ? "#7648ED"
                          : "transparent",

                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/week-long-tournament");
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-2"
                  >
                    {pathname && pathname?.includes("week-long-tournament") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 18 18"
                        className="p-1 me-1"
                      >
                        <g clipPath="url(#clip0_2059_14836)">
                          <path
                            fill="#A89CD7"
                            stroke="#A89CD7"
                            strokeWidth="0.5"
                            d="M3.933 17.03h0c-.358-.27-.52-.73-.425-1.168h0l.999-4.591-3.384-3.097s0 0 0 0C.792 7.872.67 7.4.802 6.971h0c.134-.43.501-.742.946-.785h0l4.469-.423 1.769-4.32h0A1.1 1.1 0 019 .75a1.1 1.1 0 011.013.693h0l1.77 4.32 4.467.424s0 0 0 0 0 0 0 0c.446.042.813.356.947.785.133.428.011.9-.319 1.202 0 0 0 0 0 0l-3.385 3.096 1 4.59v.001c.095.44-.068.9-.425 1.169a1.07 1.07 0 01-1.218.055h0l.133-.212-.133.211-8.917-.054zm0 0a1.075 1.075 0 001.216.056h0L9 14.684 3.933 17.03zm5.635-3.798h0l3.257 2.033-.846-3.886a1.16 1.16 0 01.345-1.103s0 0 0 0 0 0 0 0l2.88-2.636-3.8-.36h0a1.103 1.103 0 01-.914-.693s0 0 0 0L9 2.945 7.508 6.588s0 0 0 0a1.1 1.1 0 01-.912.69h0l-3.801.36 2.88 2.637 3.893 2.957zm0 0a1.075 1.075 0 00-1.136 0h0l-3.257 2.033m4.393-2.033l-4.393 2.033m0 0l.845-3.887s0 0 0 0a1.159 1.159 0 00-.345-1.103l-.5 4.99z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_2059_14836">
                            <path fill="#fff" d="M0 0H18V18H0z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="none"
                        viewBox="0 0 18 18"
                        className="p-1 me-1"
                      >
                        <g clipPath="url(#clip0_2059_14836)">
                          <path
                            fill="#A89CD7"
                            stroke="#A89CD7"
                            strokeWidth="0.5"
                            d="M3.933 17.03h0c-.358-.27-.52-.73-.425-1.168h0l.999-4.591-3.384-3.097s0 0 0 0C.792 7.872.67 7.4.802 6.971h0c.134-.43.501-.742.946-.785h0l4.469-.423 1.769-4.32h0A1.1 1.1 0 019 .75a1.1 1.1 0 011.013.693h0l1.77 4.32 4.467.424s0 0 0 0 0 0 0 0c.446.042.813.356.947.785.133.428.011.9-.319 1.202 0 0 0 0 0 0l-3.385 3.096 1 4.59v.001c.095.44-.068.9-.425 1.169a1.07 1.07 0 01-1.218.055h0l.133-.212-.133.211-8.917-.054zm0 0a1.075 1.075 0 001.216.056h0L9 14.684 3.933 17.03zm5.635-3.798h0l3.257 2.033-.846-3.886a1.16 1.16 0 01.345-1.103s0 0 0 0 0 0 0 0l2.88-2.636-3.8-.36h0a1.103 1.103 0 01-.914-.693s0 0 0 0L9 2.945 7.508 6.588s0 0 0 0a1.1 1.1 0 01-.912.69h0l-3.801.36 2.88 2.637 3.893 2.957zm0 0a1.075 1.075 0 00-1.136 0h0l-3.257 2.033m4.393-2.033l-4.393 2.033m0 0l.845-3.887s0 0 0 0a1.159 1.159 0 00-.345-1.103l-.5 4.99z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_2059_14836">
                            <path fill="#fff" d="M0 0H18V18H0z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: isNav === true ? "block" : "none",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "15px",
                        marginLeft: "5px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Week-long tour
                    </span>
                  </Box>
                </Box>
                <hr
                  style={{
                    color: "white",
                    border: "2",
                    background: "white",
                    borderColor: "white",
                    height: "3px",
                  }}
                />
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("package")
                        ? "#7648ED"
                        : "#462A71",

                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    navigate("/package");
                  }}
                  className="nav-home pt-2 pb-2 ps-2 mb-3"
                >
                  {pathname && pathname?.includes("package") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="p-1 me-1"
                    >
                      <g>
                        <path
                          fill="#fff"
                          d="M20.209 7.821l-7.7 4.46c-.31.18-.7.18-1.02 0l-7.7-4.46c-.55-.32-.69-1.07-.27-1.54.29-.33.62-.6.97-.79l5.42-3c1.16-.65 3.04-.65 4.2 0l5.42 3c.35.19.68.47.97.79.4.47.26 1.22-.29 1.54zM11.43 14.14v6.82c0 .76-.77 1.26-1.45.93-2.06-1.01-5.53-2.9-5.53-2.9-1.22-.69-2.22-2.43-2.22-3.86V9.97c0-.79.83-1.29 1.51-.9l7.19 4.17c.3.19.5.53.5.9zm1.14 0v6.82c0 .76.77 1.26 1.45.93 2.06-1.01 5.53-2.9 5.53-2.9 1.22-.69 2.22-2.43 2.22-3.86V9.97c0-.79-.83-1.29-1.51-.9l-7.19 4.17c-.3.19-.5.53-.5.9z"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="none"
                      viewBox="0 0 18 18"
                      className="p-1 me-1"
                    >
                      <g
                        stroke="#A89CD7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M2.377 5.58L9 9.413l6.577-3.81M9 16.208V9.405"></path>
                        <path d="M7.447 1.86L3.442 4.088c-.907.502-1.65 1.762-1.65 2.797v4.238c0 1.035.743 2.295 1.65 2.797l4.005 2.228c.855.472 2.258.472 3.113 0l4.005-2.228c.908-.502 1.65-1.762 1.65-2.797V6.885c0-1.035-.742-2.295-1.65-2.797L10.56 1.86c-.863-.48-2.258-.48-3.113 0z"></path>
                        <path d="M12.75 9.93V7.185l-7.118-4.11"></path>
                      </g>
                    </svg>
                  )}
                  <span
                    className="hover-nav"
                    style={{
                      display: isNav === true ? "block" : "none",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginLeft: "5px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Package
                  </span>
                </Box>
              </Box>
            ) : (
              ""
            )}
            {/* <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: isNav === true ? "flex-start" : "center",
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              backgroundColor:
                pathname && pathname?.includes("luckywheel")
                  ? "#7648ED"
                  : "#462A71",

              borderRadius: "5px",
            }}
            onClick={() => {
              if (token === null || token === "") {
                dispatch(toggleLoginDialog());
              } else {
                navigate("/luckywheel");
              }
            }}
            className="nav-home pt-2 pb-2 ps-2 mb-3"
          >
            {pathname && pathname?.includes("luckywheel") ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 22 24"
                className="p-1 me-1"
              >
                <g fill="#fff">
                  <path d="M8.183 11.636l-5.59-5.59A10.851 10.851 0 000 12.297h7.91c.065-.233.158-.454.273-.66z"></path>
                  <path d="M8.183 14.63a3.056 3.056 0 01-.273-.658H0a10.851 10.851 0 002.594 6.248l5.59-5.59z"></path>
                  <path d="M3.78 21.406A10.851 10.851 0 0010.027 24v-7.91a3.055 3.055 0 01-.66-.274l-5.589 5.59z"></path>
                  <path d="M13.822 12.295h7.91a10.852 10.852 0 00-2.594-6.248l-5.59 5.59c.116.205.209.426.274.658z"></path>
                  <path d="M13.549 14.63l5.59 5.59a10.851 10.851 0 002.593-6.248h-7.91a3.055 3.055 0 01-.273.659z"></path>
                  <path d="M10.866 14.53a1.397 1.397 0 100-2.794 1.397 1.397 0 000 2.795z"></path>
                  <path d="M12.364 15.816a3.055 3.055 0 01-.659.274V24a10.852 10.852 0 006.248-2.594l-5.589-5.59z"></path>
                  <path d="M10.028 10.177V6.215a2.515 2.515 0 01-1.466-1.363l-.93-2.126A10.895 10.895 0 003.779 4.86l5.59 5.59a3.06 3.06 0 01.659-.274z"></path>
                  <path d="M11.705 6.215v3.962c.232.066.453.158.66.273l5.589-5.589A10.895 10.895 0 0014.1 2.726l-.93 2.126a2.515 2.515 0 01-1.466 1.363z"></path>
                  <path d="M10.098 4.18a.838.838 0 001.536 0l1.316-3.006A.838.838 0 0012.182 0h-2.63a.838.838 0 00-.769 1.174l1.315 3.006z"></path>
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 16 18"
                className="p-1 me-1"
              >
                <g>
                  <g>
                    <path
                      fill="#A89CD7"
                      d="M10.313 17.652C14.107 16.36 16 13.073 16 9.837a8.266 8.266 0 00-1.807-5.167A7.974 7.974 0 009.59 1.837L10 .879a.64.64 0 00-.048-.595A.62.62 0 009.436 0H6.564a.606.606 0 00-.515.284A.636.636 0 006 .88l.41.957A7.974 7.974 0 001.807 4.67 8.266 8.266 0 000 9.837c0 3.236 1.713 6.72 5.687 7.815m2.928-.937v-4.663a2.21 2.21 0 00.484-.205l3.23 3.295a6.67 6.67 0 01-3.714 1.573zM8 10.884c-.203 0-.401-.062-.57-.177a1.043 1.043 0 01-.378-.47 1.066 1.066 0 01.223-1.14 1.007 1.007 0 011.118-.227c.187.08.347.214.46.386a1.062 1.062 0 01-.128 1.321 1.024 1.024 0 01-.725.307zm5.2 3.37L9.97 10.96c.085-.156.152-.322.2-.494h4.57a6.952 6.952 0 01-1.54 3.79zm1.542-5.045H10.17a2.291 2.291 0 00-.2-.493l3.24-3.307a6.953 6.953 0 011.532 3.8zm-6.127-5.1l.468-1.09a6.671 6.671 0 013.257 1.502L9.099 7.828a2.235 2.235 0 00-.484-.205V4.108zm-.12-2.853L8 2.41l-.495-1.154h.99zM6.917 3.019l.468 1.088v3.516c-.169.049-.331.118-.484.205L3.66 4.52a6.671 6.671 0 013.257-1.503zM2.79 5.409l3.24 3.307a2.332 2.332 0 00-.2.493H1.258a6.953 6.953 0 011.532-3.8zm-1.53 5.056h4.57c.048.172.115.338.2.494L2.8 14.255a6.952 6.952 0 01-1.54-3.79zm2.41 4.678l3.23-3.296c.154.087.316.156.485.205v4.663a6.67 6.67 0 01-3.714-1.572zm2.017 2.509a7.852 7.852 0 004.626 0H5.687z"
                    ></path>
                  </g>
                </g>
              </svg>
            )}
            <span
              className="hover-nav"
              style={{
                display: isNav === true ? "block" : "none",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
                marginLeft: "5px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              Lucky Wheel
            </span>
          </Box> */}
            {getAppType() && getAppType() === "promote" ? (
              ""
            ) : (
              <Box className="nav-pages">
                <hr style={{ color: "white" }} />
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  }}
                  className=" pt-2 pb-2"
                  onClick={() => {
                    if (!token) {
                      dispatch(clickTab(false));

                      dispatch(toggleLoginDialog());
                    } else {
                      navigate("/game-type/favorite");
                    }
                  }}
                >
                  <img
                    src={images.favoriteIcon}
                    alt="..."
                    className="p-1 me-1"
                    width={28}
                    height="auto"
                  />
                  <span
                    className="hover-nav"
                    style={{
                      display: isNav === true ? "block" : "none",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginLeft: "5px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Favorite Games
                  </span>
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  }}
                  className=" pt-2 pb-2"
                  onClick={() => {
                    navigate("/game-type/pvp");
                  }}
                >
                  <img
                    src={images.pvpicon}
                    alt="..."
                    className="p-1 me-1"
                    width={28}
                    height="auto"
                  />
                  <span
                    className="hover-nav"
                    style={{
                      display: isNav === true ? "block" : "none",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginLeft: "5px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    PVP Games
                  </span>
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  }}
                  className=" pt-2 pb-2"
                  onClick={() => {
                    navigate("/game-type/free");
                  }}
                >
                  <img
                    src={images.playicon}
                    alt="..."
                    className="p-1 me-1"
                    width={28}
                    height={"auto"}
                  />
                  <span
                    className="hover-nav"
                    style={{
                      display: isNav === true ? "block" : "none",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginLeft: "5px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Free Games
                  </span>
                </Box>
              </Box>
            )}
            <hr
              style={{
                color: "white",
                border: "2",
                background: "white",
                borderColor: "white",
                height: "3px",
              }}
            />
            {getAppType() && getAppType() === "promote" ? (
              ""
            ) : (
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                }}
                className="nav-game-log pt-2 pb-2"
                onClick={() => {
                  if (!token) {
                    dispatch(clickTab(false));

                    dispatch(toggleLoginDialog());
                  } else {
                    socket?.emit("getGameLog");
                    dispatch(toggleGameLogDialog());
                  }
                }}
              >
                <img
                  src={images.gamelogicon}
                  alt="..."
                  className="p-1 me-1"
                  width={26}
                  height="auto"
                />
                <span
                  className="hover-nav"
                  style={{
                    display: isNav === true ? "block" : "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    marginLeft: "5px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  Game Logs
                </span>
              </Box>
            )}
            {getAppType() === "promote" ? (
              <Box
                className="cursor-pointer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                }}
                onClick={() => {
                  navigate(`/help-center`);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 18 18"
                  className="p-1 me-1"
                >
                  <g
                    stroke="#A89CD7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeMiterlimit="10"
                      d="M12.75 13.822h-3l-3.338 2.22a.75.75 0 01-1.162-.622v-1.598c-2.25 0-3.75-1.5-3.75-3.75v-4.5c0-2.25 1.5-3.75 3.75-3.75h7.5c2.25 0 3.75 1.5 3.75 3.75v4.5c0 2.25-1.5 3.75-3.75 3.75z"
                    ></path>
                    <path d="M9 8.52v-.158c0-.51.315-.78.63-.997.307-.21.615-.48.615-.975 0-.69-.555-1.245-1.245-1.245-.69 0-1.245.555-1.245 1.245m1.241 3.922h.008"></path>
                  </g>
                </svg>
                <span
                  className="hover-nav"
                  style={{
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    marginLeft: "5px",
                    display: isNav === true ? "block" : "none",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  Help Center
                </span>
              </Box>
            ) : (
              <Box
                className="cursor-pointer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                }}
                onClick={() => {}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 18 18"
                  className="p-1 me-1"
                >
                  <g
                    stroke="#A89CD7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeMiterlimit="10"
                      d="M12.75 13.822h-3l-3.338 2.22a.75.75 0 01-1.162-.622v-1.598c-2.25 0-3.75-1.5-3.75-3.75v-4.5c0-2.25 1.5-3.75 3.75-3.75h7.5c2.25 0 3.75 1.5 3.75 3.75v4.5c0 2.25-1.5 3.75-3.75 3.75z"
                    ></path>
                    <path d="M9 8.52v-.158c0-.51.315-.78.63-.997.307-.21.615-.48.615-.975 0-.69-.555-1.245-1.245-1.245-.69 0-1.245.555-1.245 1.245m1.241 3.922h.008"></path>
                  </g>
                </svg>
                <span
                  className="hover-nav"
                  style={{
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    marginLeft: "5px",
                    display: isNav === true ? "block" : "none",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  FAQs
                </span>
              </Box>
            )}
          </Box>
          {/* <Box
          sx={{
            display: isNav === true ? "block" : "none",
          }}
        >
          <hr style={{ color: "white" }} />
          <Box className="nav-currencies">
            <Box>
              <Typography>Currencies</Typography>
            </Box>
            <Box className="coin-total d-flex justify-content-evenly pt-3 pb-4">
              <img src={popup.Doge2} alt="..." width={25} height={25} />
              <img src={images.BNB} alt="..." width={25} height={25} />
              <img src={images.BTC} alt="..." width={25} height={25} />
              <img src={popup.LCoin} alt="..." width={25} height={25} />
              <img src={popup.TCoin} alt="..." width={25} height={25} />
            </Box>
          </Box>
        </Box> */}
        </Box>
      </Box>
    </>
  );
}