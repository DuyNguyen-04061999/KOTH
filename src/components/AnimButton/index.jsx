import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import "./index.scss";

export default function AnimButton(props) {
  const {
    text,
    onClick,
    type = "primary",
    style,
    isHasIcon,
    isSubmitBtn,
    disabledBtn,
    upperCase,
  } = props;

  const ArrrowIcon = () => (
    <span className="icon-arrow">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 66 50"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="arrow"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            id="arrow-icon-one"
            d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
            fill="#FFFFFF"
          ></path>
          <path
            id="arrow-icon-two"
            d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
            fill="#FFFFFF"
          ></path>
          <path
            id="arrow-icon-three"
            d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
            fill="#FFFFFF"
          ></path>
        </g>
      </svg>
    </span>
  );
  switch (type) {
    case "primary":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "#7848ED",
            color: "white",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            ":hover": {
              background: "#5E32D1",
            },
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          disableRipple
          disabled={disabledBtn}
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
            }}
          >
            {text}
          </p>
          {isHasIcon ? <ArrrowIcon /> : <></>}
        </Button>
      );
    case "loading":
      return (
        <LoadingButton
          sx={{
            backgroundColor: "#7848ED",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            color: "transparent",
            ":hover": {
              background: "#5E32D1",
            },
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          disableRipple
          loading
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
            }}
          >
            {text}
          </p>
        </LoadingButton>
      );
    case "ghost":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "transparent",
            color: "#7848ED",
            padding: "9px 5px",
            borderRadius: "8px",
            border: "2px solid #7848ED",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            ":hover": {
              background: "transparent",
            },
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          disabled={disabledBtn}
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
            }}
          >
            {text}
          </p>
        </Button>
      );
    case "disable":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "#979797",
            color: "white !important",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            ...style,
          }}
          disabled
          onClick={onClick}
          disableRipple
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
            }}
          >
            {text}
          </p>
          {isHasIcon ? <ArrrowIcon /> : <></>}
        </Button>
      );
    case "highlight":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "#BE48ED",
            color: "white",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            display: "flex",
            alignItems: "center",
            ":hover": {
              background: "#BE48ED",
            },
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          disableRipple
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
            }}
          >
            {text}
          </p>
          {isHasIcon ? <ArrrowIcon /> : <></>}
        </Button>
      );
    case "success":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "#4FBF67",
            color: "white",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            ":hover": {
              background: "#4FBF67",
            },
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          disableRipple
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
            }}
          >
            {text}
          </p>
          {isHasIcon ? <ArrrowIcon /> : <></>}
        </Button>
      );
    case "error":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "#F05153",
            color: "white",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            ":hover": {
              background: "#F05153",
            },
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          disableRipple
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
            }}
          >
            {text}
          </p>
          {isHasIcon ? <ArrrowIcon /> : <></>}
        </Button>
      );
    case "full-width":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "#7848ED",
            color: "white",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            ":hover": {
              background: "#5E32D1",
            },
            fontSize: "16px",
            ...style,
          }}
          loading
          onClick={onClick}
          disableRipple
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
            }}
          >
            {text}
          </p>
        </Button>
      );
    case "active":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: isHasIcon ? "#7848ED" : "#443565",
            color: "white",
            padding: "11px 20px",
            borderRadius: "20px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            " :hover": {
              backgroundColor: isHasIcon ? "#7848ED" : "#443565",
            },
            display: "flex",
            alignItems: "center",
            fontSize: "16px",

            ...style,
          }}
          onClick={onClick}
          // disableRipple
          disabled={disabledBtn}
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
              marginRight: isHasIcon ? "5px" : "0px",
            }}
          >
            {text}
          </p>

          {isHasIcon ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="13"
              fill="none"
              viewBox="0 0 17 13"
            >
              <g>
                <g>
                  <path
                    fill="#fff"
                    d="M6.1 8.1L2.9 4.9.5 7.3l5.6 5.6L16.5 2.5 14.1.1l-8 8z"
                  ></path>
                </g>
              </g>
            </svg>
          ) : (
            <></>
          )}
        </Button>
      );
    case "christmas":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "#C02F40",
            color: "white",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            ":hover": {
              background: "#C02F40",
            },
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          // disableRipple
          disabled={disabledBtn}
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
              fontSize: "14px",
            }}
          >
            {text}
          </p>
          {isHasIcon ? <ArrrowIcon /> : <></>}
        </Button>
      );
    case "close":
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: isHasIcon ? "#7848ED" : "#443565",
            color: "white",
            padding: "11px 20px",
            borderRadius: "20px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            " :hover": {
              backgroundColor: isHasIcon ? "#7848ED" : "#443565",
            },
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          // disableRipple
          disabled={disabledBtn}
        >
          <p
            style={{
              textTransform: upperCase ? "uppercase" : "none",
              marginRight: isHasIcon ? "5px" : "0px",
            }}
          >
            {text}
          </p>

          {isHasIcon ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="13"
              fill="none"
              viewBox="0 0 11 13"
            >
              <g fill="#fff">
                <path d="M10.75 11L1.562.5.25 2l9.188 10.5L10.75 11z"></path>
                <path d="M9.438.5L.25 11l1.313 1.5L10.75 2 9.437.5z"></path>
              </g>
            </svg>
          ) : (
            <></>
          )}
        </Button>
      );
    default:
      return (
        <Button
          type={isSubmitBtn && "submit"}
          sx={{
            backgroundColor: "#7848ED",
            color: "white",
            padding: "11px 5px",
            borderRadius: "8px",
            border: "0px solid",
            width: "100%",
            fontWeight: "700",
            transition: ".3s ease",
            ":hover": {
              background: "#5E32D1",
            },
            fontSize: "16px",
            ...style,
          }}
          onClick={onClick}
          disableRipple
        >
          <p
            style={{
              textTransform: "none",
            }}
          >
            {text}
          </p>
        </Button>
      );
  }
}
