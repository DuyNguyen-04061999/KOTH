import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, FormControl, Input, Typography } from "@mui/material";
import copy from "copy-to-clipboard";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import { toast } from "react-toastify";
import { closeShareQrCode } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function ShareQrCodeComponent() {
    const { width, height } = useWindowDimensions();
    const { name } = useSelector(state => state?.adminAuthReducer)
    const location = window.location.host.replace("admin.", "");
    const urlRedirect = process.env.REACT_APP_ENV === "development" ? `http://${location}/influencers/${name}` : `https://${location}/influencers/${name}`;
    const { isShareQrCode } = useSelector(state => state.adminDialogReducer)
    const copyref = `${urlRedirect}`;
    const [copySuccess, setCopySuccess] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeShareQrCode());
        setCopySuccess(false);
    };


  return ReactDOM.createPortal(
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "5px !important",
            backgroundColor: "transparent !important",
            margin: "20px",
          },
          zIndex: "1322",
          borderRadius: "5px !important",
          backgroundColor: "transparent !important",
        }}
        maxWidth={"md"}
        open={isShareQrCode}
        onClose={handleClose}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            width: width > 576 ? "430px" : "100%",
            height: "100%",
            overflow: "auto",
            minHeight: width < 576 ? "unset" : "unset",
            maxHeight: width < 576 ? "unset" : height - 100,
            padding: "20px 10px",
          }}
        >
          <Box
                sx={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "1px 20px 25px 5px #E4E4E4",
                    borderRadius: "50%",
                }}
                onClick={handleClose}
            >
                <CloseIcon/>
            </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            className="cursor-pointer"
          >
            <svg
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <g fill="#fff">
                <path d="M20 2.5L2.5 20 0 17.5 17.5 0 20 2.5z"></path>
                <path d="M17.5 20L0 2.5 2.5 0 20 17.5 17.5 20z"></path>
              </g>
            </svg>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "50px",
            }}
          >
            <Typography sx={{ fontSize: "18px", color: "#000" }}>
              Share Promo Code
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "75px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#E4F7FD",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "42px",
                  height: "42px",
                  marginBottom: "10px",
                }}
              >
                <TwitterShareButton url={copyref}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="21"
                    fill="none"
                    viewBox="0 0 25 21"
                  >
                    <g>
                      <g>
                        <path
                          fill="#0DA3F1"
                          d="M0 18.398c2.69.091 5.125-.554 7.375-2.237-2.343-.268-3.918-1.422-4.8-3.628h2.102l.04-.13c-1.12-.349-2.088-.915-2.815-1.84a5.163 5.163 0 01-1.133-3.2l2.079.575.073-.118C.749 5.908.248 3.663 1.485.95c2.84 3.316 6.354 5.147 10.714 5.444 0-.757-.105-1.474.02-2.15.363-1.956 1.533-3.297 3.42-3.94 1.866-.638 3.58-.257 5.076 1.015.285.241.52.348.876.217.891-.331 1.79-.643 2.718-.973-.336 1.073-1.049 1.889-1.968 2.566l.074.137L25 2.555a9.073 9.073 0 01-2.084 2.248.935.935 0 00-.418.859c.099 6.597-4.285 12.6-10.544 14.352-4.002 1.122-7.866.693-11.521-1.34-.15-.08-.29-.183-.433-.276z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </TwitterShareButton>
              </Box>
              <Typography sx={{ color: "#000", fontSize: "12px" }}>
                Twitter
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "75px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#E6F2FE",
                  padding: "5px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "42px",
                  height: "42px",
                  marginBottom: "10px",
                }}
              >
                <FacebookShareButton url={copyref}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="26"
                    fill="none"
                    viewBox="0 0 25 26"
                  >
                    <g> 
                      <g>
                        <path
                          fill="#1F70F1"
                          d="M10.652 24.929C5.948 24.476.459 20.244.025 13.348-.417 6.298 4.955.377 11.787.018c6.878-.361 12.836 4.908 13.19 11.594.187 3.516-.762 6.65-3.108 9.312-1.843 2.091-4.12 3.466-6.906 4.08v-8.967h2.41c.188-1.185.37-2.322.561-3.534h-3.656c0-1.021-.072-1.98.022-2.922.077-.77.707-1.238 1.525-1.295.67-.045 1.346-.027 2.02-.036h.58v-3.1c-1.504-.202-3.005-.428-4.504-.027-1.881.505-3.068 1.96-3.181 3.956-.062 1.103-.011 2.215-.011 3.4H7.886v3.54h2.766v8.91z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </FacebookShareButton>
              </Box>
              <Typography sx={{ color: "#000", fontSize: "12px" }}>
                Facebook
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "75px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#FFF1E4",
                  padding: "5px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "42px",
                  height: "42px",
                  marginBottom: "10px",
                }}
              >
                <RedditShareButton title="Play4promo" url={copyref}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    fill="none"
                    viewBox="0 0 25 24"
                  >
                    <g>
                      <g>
                        <g>
                          <g>
                            <path
                              fill="#FF5722"
                              d="M4.838 10.027c2.159-1.457 4.54-2.12 7.15-2.272.202-.921.409-1.849.612-2.776.32-1.46.635-2.92.961-4.379.12-.541.282-.645.826-.526 1.506.333 3.013.668 4.514 1.02.277.066.429.025.607-.215.632-.855 1.651-1.105 2.553-.667a2.135 2.135 0 011.133 2.41c-.244.969-1.098 1.647-2.05 1.634-1.002-.015-1.816-.741-2.02-1.788-.025-.13-.135-.32-.238-.346-1.45-.35-2.906-.677-4.426-1.026-.488 2.235-.971 4.433-1.46 6.66 2.615.127 5.033.781 7.207 2.255.684-.596 1.453-.94 2.372-.808 1.198.174 2.05.955 2.333 2.12.283 1.166-.127 2.258-1.085 2.974-.138.103-.302.324-.282.465.407 2.714-.71 4.79-2.72 6.462-1.923 1.6-4.198 2.384-6.656 2.641-3.036.319-5.939-.154-8.598-1.72-1.895-1.116-3.392-2.611-3.905-4.825-.185-.788-.091-1.64-.146-2.462-.01-.16-.072-.378-.188-.463-1.436-1.05-1.757-2.791-.736-4.142.976-1.292 2.733-1.432 4.1-.325.032.03.075.054.142.1zm1.018 4.739c-.016 1.19.885 2.123 2.058 2.13a2.052 2.052 0 002.071-2.065c.01-1.19-.905-2.148-2.05-2.148a2.09 2.09 0 00-2.08 2.083zm13.309.065a2.087 2.087 0 00-2.064-2.14c-1.125-.01-2.05.925-2.069 2.082-.013 1.189.897 2.13 2.06 2.128a2.068 2.068 0 002.07-2.07h.003zm-6.661 6.46c.516-.047 1.038-.067 1.55-.149 1.084-.173 2.119-.488 2.968-1.235.268-.236.382-.506.114-.799-.247-.271-.497-.168-.775.017-.401.266-.813.577-1.269.696-2.276.602-4.513.736-6.564-.756-.138-.098-.483-.06-.64.047-.242.167-.239.477-.007.677.301.27.632.505.986.7 1.136.591 2.369.762 3.635.802h.002z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </RedditShareButton>
              </Box>
              <Typography sx={{ color: "#000", fontSize: "12px" }}>
                Reddit
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "75px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#E5F3FC",
                  padding: "5px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "42px",
                  height: "42px",
                  marginBottom: "10px",
                }}
              >
                <TelegramShareButton url={copyref}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="21"
                    fill="none"
                    viewBox="0 0 25 21"
                  >
                    <g>
                      <g>
                        <path
                          fill="#0D8CDD"
                          d="M13.318 16.37c-.966.922-1.909 1.845-2.882 2.733-.256.233-.608.361-.915.537l-.122-.118c.065-.984.128-1.968.195-2.953.054-.782.13-1.56.16-2.34a1.03 1.03 0 01.384-.793c3.34-2.986 6.676-5.98 10.006-8.978.186-.166.353-.353.557-.557-.428-.306-.72-.098-.999.073-1.757 1.093-3.51 2.19-5.26 3.29-2.512 1.571-5.021 3.15-7.543 4.705a.978.978 0 01-.706.098 269.899 269.899 0 01-5.174-1.604C.575 10.324.014 10.22 0 9.64c-.012-.556.513-.77.944-.936C3.2 7.823 5.467 6.96 7.73 6.093L23.083.21c.167-.069.338-.125.513-.169.747-.171 1.311.2 1.394.96.027.34 0 .682-.078 1.014-1.238 5.844-2.482 11.686-3.73 17.527-.044.206-.11.408-.196.601-.285.633-.782.863-1.436.635a3.024 3.024 0 01-.764-.422c-1.687-1.224-3.367-2.46-5.049-3.692-.132-.095-.265-.185-.42-.294z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </TelegramShareButton>
              </Box>
              <Typography sx={{ color: "#000", fontSize: "12px" }}>
                Telegram
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{ color: "#000", marginBottom: "10px !important" }}
            >
              Promo code link
            </Typography>
            <FormControl
              variant="standard"
              sx={{
                width: "100%",
                backgroundColor: "#E5F3FC",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#000",
              }}
            >
              <Input
                id="input-with-icon-adornment"
                value={copyref}
                disabled
                sx={{
                    width: "100%",
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000",
                  },
                  "&:before": {
                    borderBottom: "0px solid",
                    "&:hover": {
                      borderBottom: "0px solid",
                    },
                  },
                  "&:after": {
                    borderBottom: "0px solid",
                  },
                  "&:hover": {
                    border: "none",
                  },
                  color: "#000",
                  marginLeft: "10px",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              />
              <Box
                onClick={() => {
                  copy(copyref);
                  // dispatch(showAlert("success", "Copy successfully!"));
                  setCopySuccess(true);
                  toast.success("Copy link successfully!", {
                    icon: ({ theme, type }) => (
                      <img
                        style={{ width: "20px", marginRight: "10px" }}
                        alt="..."
                        src={images.successIcon}
                      />
                    ),
                    position: "top-center",

                    className:
                      width < 576
                        ? "success-background-small"
                        : "success-background",
                  });
                }}
              >
                {copySuccess === false ? (
                  <img
                    src={images.copybutton}
                    className="cursor-pointer"
                    alt=""
                  />
                ) : (
                  <Box
                    sx={{
                      width: "46px",
                      height: "46px",
                      backgroundColor: "#4FBF67",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="24"
                      fill="none"
                      viewBox="0 0 22 24"
                    >
                      <g>
                        <g>
                          <g>
                            <path
                              fill="#fff"
                              d="M8.6 13.6l-3.2-3.2L3 12.8l5.6 5.6L19 8l-2.4-2.4-8 8z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </Box>
                )}
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Dialog>
    </>, document.body
  );
}
