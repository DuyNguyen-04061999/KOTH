import { Box, Button, FormControl, Input, Typography } from "@mui/material";
import { useState } from "react";
import "./index.scss";
import { sign } from "../../../../utils/images";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { getFontSizeButtonDependOnWidth } from "../../../../utils/config";

export default function Signup(props) {
  const { handleTab } = props;
  const [gender, setGender] = useState(0);
  const { registerValue } = useSelector((state) => state.authReducer);
  const [blur, setBlur] = useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ref, setRef] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (registerValue === "success") {
      setUsername("");
      setPassword("");
      setC_password("");
      // setFirstName("");
      // setLastName("");
      setEmail("");
      setPhone("");
      setRef("");
    }
  }, [registerValue, handleTab]);

  useEffect(() => {
    if (
      gender === "" ||
      username === "" ||
      password === "" ||
      c_password === "" ||
      !email.includes("@gmail.com")
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [username, password, c_password, email, gender]);

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    sendRegister();
  };

  //------------------------------------------------------------------
  const sendRegister = () => {
    _socket.emit("register", {
      username: username,
      password: password,
      // firstName: firstName,
      // lastName: lastName,
      email: email,
      phone: phone,
      ref: ref,
      c_password: c_password,
      gender: gender,
    });
  };
  return (
    <Box className="signup">
      <Box component="form" className="p-2 ps-2 pe-3" noValidate>
        <Box>
          <Typography
            variant="h5"
            className="text-center text-white"
            sx={{ marginBottom: width < 576 ? "30px" : "30px" }}
          >
            Sign Up
          </Typography>
        </Box>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={sign.up01}
            alt="..."
            width={17}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "11px" : "10px",
              left: width > 576 ? "12px" : "10px",
            }}
          />
          <Input
            name="username"
            type="text"
            autoComplete="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder="User Name"
            sx={{
              "&:before": {
                borderBottom: "0px solid !important",
                "&:hover": {
                  borderBottom: "0px solid !important",
                },
              },
              "&:after": {
                borderBottom: "0px solid !important",
              },
              "&:hover": {
                border: "none",
              },
              "&:placeholder": {
                color: "white",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 35px !important",
            }}
          />
        </FormControl>
        <Box className="position-relative">
          <div className="d-flex justify-content-between align-items-center ps-2 pe-2 pb-2 radio-group">
            <div
              onClick={() => {
                setGender(0);
              }}
            >
              <input
                className="me-2"
                type="radio"
                id="contactChoice1"
                name="contact"
                defaultChecked
              />
              <label style={{ color: "white" }}>Mr</label>
            </div>

            <div
              onClick={() => {
                setGender(1);
              }}
            >
              <input
                className="me-2"
                type="radio"
                id="contactChoice2"
                name="contact"
                value="phone"
              />
              <label style={{ color: "white" }}>Mrs</label>
            </div>

            <div
              onClick={() => {
                setGender(2);
              }}
            >
              <input
                className="me-2"
                type="radio"
                id="contactChoice3"
                name="contact"
                value="mail"
              />
              <label style={{ color: "white" }}>Other</label>
            </div>
          </div>
          {/* <Box
            className="d-flex justify-content-between align-items-center"
            sx={{
              height: 56,
            }}
          >
            <Box
              className="d-flex justify-content-center align-items-center p-2"
              onClick={() => {
                setGender(0);
              }}
            >
              <div class="checkbox-wrapper-13">
                <input type="radio" id="c1-13" />
              </div>
              <span
                className="mx-2"
                style={{
                  color: "#5654a0",
                  fontWeight: "500",
                }}
              >
                Mr
              </span>
            </Box>
            <Box
              className="d-flex justify-content-center align-items-center p-2"
              onClick={() => {
                setGender(1);
              }}
            >
              <div class="checkbox-wrapper-13">
                <input type="radio" id="c1-13" />
              </div>
              <span
                className="mx-2"
                style={{
                  color: "#5654a0",
                  fontWeight: "500",
                }}
              >
                Mrs
              </span>
            </Box>
            <Box
              className="d-flex justify-content-center align-items-center p-2"
              onClick={() => {
                setGender(2);
              }}
            >
              <div class="checkbox-wrapper-13">
                <input type="radio" id="c1-13" />
              </div>
              <span
                className="mx-2"
                style={{
                  color: "#5654a0",
                  fontWeight: "500",
                }}
              >
                Others
              </span>
            </Box>
          </Box> */}
        </Box>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={sign.up02}
            alt="..."
            width={15}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "10px" : "10px",
              left: width > 576 ? "12px" : "10px",
            }}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(e) => {
              setBlur(false);
              setPassword(e.target.value);
            }}
            onBlur={() => setBlur(true)}
            value={password}
            sx={{
              "&:before": {
                borderBottom: "0px solid !important",
                "&:hover": {
                  borderBottom: "0px solid !important",
                },
              },
              "&:after": {
                borderBottom: "0px solid !important",
              },
              "&:hover": {
                border: "none",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 35px !important",
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={sign.up02}
            alt="..."
            width={15}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "10px" : "10px",
              left: width > 576 ? "12px" : "10px",
            }}
          />
          <Input
            type="password"
            name="c_password"
            autoComplete="new-password"
            onChange={(e) => {
              setC_password(e.target.value);
            }}
            value={c_password}
            placeholder="Confirm Password"
            sx={{
              "&:before": {
                borderBottom: "0px solid !important",
                "&:hover": {
                  borderBottom: "0px solid !important",
                },
              },
              "&:after": {
                borderBottom: "0px solid !important",
              },
              "&:hover": {
                border: "none",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 35px !important",
            }}
          />
          {c_password !== password && blur === true ? (
            <span className="text-danger">Password does not match</span>
          ) : null}
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={sign.up03}
            alt="..."
            width={18}
            height={"auto"}
            style={{
              position: "absolute",
              top: "13px",
              left: width > 576 ? "10px" : "8px",
            }}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            sx={{
              "&:before": {
                borderBottom: "0px solid !important",
                "&:hover": {
                  borderBottom: "0px solid !important",
                },
              },
              "&:after": {
                borderBottom: "0px solid !important",
              },
              "&:hover": {
                border: "none",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 35px !important",
            }}
          />{" "}
          {email && !email.includes("@gmail.com") && (
            <span className="text-danger">Email must contain @gmail.com</span>
          )}
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={sign.up04}
            alt="..."
            width={13}
            style={{
              position: "absolute",
              top: "10px",
              left: width > 576 ? "13px" : "10px",
            }}
          />
          <Input
            type="number"
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            placeholder="Mobile Number"
            sx={{
              "&:before": {
                borderBottom: " 0px solid !important ",
                "&:hover": {
                  borderBottom: "0px solid !important",
                },
              },
              "&:after": {
                borderBottom: "0px solid !important",
              },
              "&:hover": {
                border: "none",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 35px !important",
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={sign.up05}
            alt="..."
            width={18}
            height={"auto"}
            style={{
              position: "absolute",
              top: "12px",
              left: width > 576 ? "12px" : "8px",
            }}
          />
          <Input
            id="input-with-icon-adornment"
            type="text"
            placeholder="Refcode"
            onChange={(e) => {
              setRef(e.target.value);
            }}
            value={ref}
            sx={{
              "&:before": {
                borderBottom: "0px solid !important",
                "&:hover": {
                  borderBottom: "0px solid !important",
                },
              },
              "&:after": {
                borderBottom: "0px solid !important",
              },
              "&:hover": {
                border: "none",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 35px !important",
            }}
          />
        </FormControl>
        <Box
          className="d-flex justify-content-center mb-3"
          sx={{ paddingTop: width < 576 ? "30px" : "0" }}
        >
          {/* <Button
            type="submit"
            onClick={handleSubmitSignUp}
            className=" mt-2"
            disabled={disabledBtn}
            sx={{
              borderRadius: 1,
              padding: "8px 35px",
              background:
                disabledBtn === true
                  ? "#6f6683"
                  : "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
            }}
          >
            <span
              style={{
                color: "#faecf1",
                fontWeight: "700",
              }}
            >
              SIGN UP
            </span>
          </Button> */}
          <div className="btn-conteiner">
            {disabledBtn === true ? (
              <Button
                type="submit"
                className=" mt-2"
                disabled={true}
                sx={{
                  borderRadius: 1,
                  padding: "8px 35px",
                  background: "#6f6683",
                }}
              >
                <span
                  style={{
                    color: "#faecf1",
                    fontWeight: "700",
                  }}
                >
                  SIGN UP
                </span>
              </Button>
            ) : (
              <button onClick={handleSubmitSignUp} className="btn-content">
                <span
                  style={{
                    fontSize: getFontSizeButtonDependOnWidth(width),
                  }}
                  className="btn-title"
                >
                  SIGN UP
                </span>
                <span className="icon-arrow">
                  <svg
                    width="30px"
                    height="40px"
                    viewBox="0 0 66 43"
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
              </button>
            )}
          </div>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#7671ba",
              fontWeight: "500",
            }}
          >
            Already Registered ?
            <Typography
              onClick={() => {
                dispatch(clickTab(false));
              }}
              sx={{ color: "#ffb600", cursor: "pointer" }}
            >
              Sign In
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
