import { Box, Dialog, FormControl, Input, Typography } from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../../utils/images";

export default function ShareTour() {
  const { width, height } = useWindowDimensions();
  const { isShare } = useSelector((state) => state.authReducer);
  const { refCode } = useSelector((state) => state.profileReducer);
  return (
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
        // maxWidth="2000px !important"
        maxWidth={"md"}
        open={isShare}
      >
        <Box
          sx={{
            backgroundColor: "#271C39",
            width: "100%",
            height: "100%",
            overflow: "auto",
            minHeight: width < 576 ? "unset" : "unset",
            maxHeight: width < 576 ? "unset" : height - 100,
            padding: "20px 10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <svg
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
            <Typography sx={{ fontSize: "18px", color: "white" }}>
              Share
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
                  backgroundColor: "white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                  marginBottom: "10px",
                }}
              >
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
              </Box>
              <Typography sx={{ color: "white", fontSize: "12px" }}>
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
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                  marginBottom: "10px",
                }}
              >
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
              </Box>
              <Typography sx={{ color: "white", fontSize: "12px" }}>
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
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                  marginBottom: "10px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  fill="none"
                  viewBox="0 0 25 24"
                >
                  <g>
                    <g>
                      <path
                        fill="#0E7EEE"
                        d="M12.487 22.674a14.109 14.109 0 01-4.268-.677.942.942 0 00-.63.054 137.906 137.906 0 00-3.23 1.603c-.355.182-.697.27-1.056.032-.38-.254-.419-.63-.361-1.038.146-1.03.307-2.058.428-3.09.024-.208-.036-.502-.173-.641C-1.627 14.03-.955 6.398 4.963 2.304 10.528-1.545 18.515-.455 22.627 4.7c3.877 4.86 2.909 11.624-2.21 15.406-2.354 1.74-5.016 2.547-7.93 2.568zM11.26 8.6c-.626.006-.966.26-1.231.676-1.074 1.686-2.16 3.364-3.24 5.047-.138.215-.367.477-.065.669.132.083.463-.024.63-.147a77.97 77.97 0 002.62-2.03c.542-.437 1.07-.468 1.66-.112a74.49 74.49 0 002.157 1.237c.683.383 1.255.258 1.69-.39a380.19 380.19 0 003.076-4.63c.098-.15.047-.399.066-.601-.195.013-.416-.034-.571.048a126.83 126.83 0 00-3.027 1.675c-.521.293-1.006.293-1.503-.058a39.708 39.708 0 00-1.667-1.105 4.48 4.48 0 00-.595-.279z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </Box>
              <Typography sx={{ color: "white", fontSize: "12px" }}>
                Messenger
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
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  height: "50px",
                  marginBottom: "10px",
                }}
              >
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
              </Box>
              <Typography sx={{ color: "white", fontSize: "12px" }}>
                Telegram
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{ color: "white", marginBottom: "10px !important" }}
            >
              Page Link
            </Typography>
            <FormControl
              variant="standard"
              sx={{
                width: "100%",
                backgroundColor: "#3d2c63",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
              }}
            >
              <Input
                id="input-with-icon-adornment"
                value={refCode}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#fff",
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
                  color: "#fff",
                  marginLeft: "10px",
                  fontWeight: "700",
                }}
              />
              <Box>
                <img
                  src={images.copybutton}
                  className="cursor-pointer"
                  alt=""
                />
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
