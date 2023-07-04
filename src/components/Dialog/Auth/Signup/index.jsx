import { Box, Button, FormControl, Input, Typography } from "@mui/material";
import { useState } from "react";
import "./index.scss";
import { sign } from "../../../../utils/images";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import useWindowDimensions from "../../../../utils/useWindowDimensions";

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
  const {width} = useWindowDimensions()

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
      username === "" ||
      password === "" ||
      c_password === "" ||
      !email.includes("@gmail.com")
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [username, password, c_password, email]);

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
    <Box>
      <Box component="form" className="p-2 ps-2 pe-3" noValidate>
        <Box>
          <Typography variant="h5" className="text-center text-white mb-3">
            Sign Up
          </Typography>
        </Box>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" :"5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom:  width > 576 ? "10px" : "5px",
          }}
        >
          <img
            src={sign.up01}
            alt="..."
            width={17}
            height={"auto"}
            style={{ position: "absolute", top: width > 576 ? "11px" : "10px" }}
          />
          <Input
            name="username"
            type="text"
            autoComplete="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder="Enter User Name"
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
              color: "#5a3d8f",
              fontWeight:"700",
              padding: "0px 0px 0px 25px !important",
            }}
          />
        </FormControl>
        <Box className="position-relative">
          <Box
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
              <img
                src={gender === 0 ? sign.chose1 : sign.chose2}
                alt="..."
                width={25}
              />
              <span
                className="mx-2"
                style={{
                  color: "#5654a0",
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
              <img
                src={gender === 1 ? sign.chose1 : sign.chose2}
                alt="..."
                width={25}
              />
              <span
                className="mx-2"
                style={{
                  color: "#5654a0",
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
              <img
                src={gender === 2 ? sign.chose1 : sign.chose2}
                alt="..."
                width={25}
              />
              <span
                className="mx-2"
                style={{
                  color: "#5654a0",
                }}
              >
                Others
              </span>
            </Box>
          </Box>
        </Box>
        {/* <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "10px" :"5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom:  width > 576 ? "10px" : "5px",
          }}
        >
          <img
            src={sign.up01}
            alt="..."
            width={17}
            height={"auto"}
            style={{ position: "absolute", top: width > 576 ? "14px" : "10px" }}
          />
          <Input
            type="text"
            name="firstName"
            autoComplete="username"
            placeholder="Enter Firstname"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
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
              color: "#7671ba",
              padding: "0px 0px 0px 25px !important",
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "10px" :"5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom:  width > 576 ? "10px" : "5px",
          }}
        >
          <img
            src={sign.up01}
            alt="..."
            width={17}
            height={"auto"}
            style={{ position: "absolute", top: width > 576 ? "14px" : "10px" }}
          />
          <Input
            type="text"
            name="lastName"
            autoComplete="username"
            placeholder="Enter Lastname"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
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
              color: "#7671ba",
              padding: "0px 0px 0px 25px !important",
            }}
          />
        </FormControl> */}
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" :"5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom:  width > 576 ? "10px" : "5px",
          }}
        >
          <img
            src={sign.up02}
            alt="..."
            width={15}
            height={"auto"}
            style={{ position: "absolute", top: width > 576 ? "10px" : "10px"}}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
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
              color: "#5a3d8f",
              fontWeight:"700",
              padding: "0px 0px 0px 25px !important",
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" :"5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom:  width > 576 ? "10px" : "5px",
          }}
        >
          <img
            src={sign.up02}
            alt="..."
            width={15}
            height={"auto"}
            style={{ position: "absolute", top: width > 576 ? "10px" : "10px" }}
          />
          <Input
            type="password"
            name="c_password"
            autoComplete="new-password"
            onChange={(e) => {
              setC_password(e.target.value);
            }}
            value={c_password}
            placeholder="Re-Enter Password"
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
              color: "#5a3d8f",
              fontWeight:"700",
              padding: "0px 0px 0px 25px !important",
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
            padding: width > 576 ? "5px 10px" :"5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom:  width > 576 ? "10px" : "5px",
          }}
        >
          <img
            src={sign.up03}
            alt="..."
            width={18}
            height={"auto"}
            style={{ position: "absolute", top: "12px" }}
          />
          <Input
            type="text"
            name="email"
            placeholder="Enter Email"
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
              color: "#5a3d8f",
              fontWeight:"700",
              padding: "0px 0px 0px 25px !important",
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
            padding: width > 576 ? "5px 10px" :"5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom:  width > 576 ? "10px" : "5px",
          }}
        >
          <img
            src={sign.up04}
            alt="..."
            width={18}
            style={{ position: "absolute", top: "12px" }}
          />
          <Input
            type="number"
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            placeholder="Enter Mobile Number"
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
              color: "#5a3d8f",
              fontWeight:"700",
              padding: "0px 0px 0px 25px !important",
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" :"5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom:  width > 576 ? "10px" : "5px",
          }}
        >
          <img
            src={sign.up05}
            alt="..."
            width={18}
            height={"auto"}
            style={{ position: "absolute", top: "12px" }}
          />
          <Input
            id="input-with-icon-adornment"
            type="text"
            placeholder="Enter Refcode"
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
              color: "#5a3d8f",
              fontWeight:"700",
              padding: "0px 0px 0px 25px !important",
            }}
          />
        </FormControl>
        <Box className="d-flex justify-content-center mb-3">
          <Button
            type="submit"
            onClick={handleSubmitSignUp}
            className=" mt-2"
            disabled={disabledBtn}
            sx={{
              background:
                "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
              borderRadius: 1,
              padding: "8px 35px",
              opacity: disabledBtn === true ? "0.1" : "",
            }}
          >
            <span
              style={{
                color: "#faecf1",
              }}
            >
              SIGN UP
            </span>
          </Button>
        </Box>
        <Box
          onClick={() => {
            dispatch(clickTab(false));
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#7671ba",
              fontWeight:"500"
            }}
          >
            Already Registered ?
            <Typography sx={{ color: "#ffb600", cursor: "pointer" }}>
              Sign In
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
