import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { withStyles } from "@mui/styles";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import AnimButton from "../../../../components/AnimButton";
import BannerLoading from "../../../../components/LoadingComponent/BannerLoading";
import _socket from "../../../../redux-saga-middleware/config/socket";
import {
  getIdPackage,
  toggleLoginDialog,
} from "../../../../redux-saga-middleware/reducers/authReducer";
import { saveDataPackage } from "../../../../redux-saga-middleware/reducers/packageReducer";
import { toggleCheckWallet } from "../../../../redux-saga-middleware/reducers/walletReducer";
import { images } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
  },
})(Tooltip);

export default function ListPackage(props) {
  const {
    packageName,
    packageAvatar,
    packagePrice,
    packageFreeTicketTournament,
    packageReduceWatchAds,
    id,
    avatarChristmas,
    des,
    packageCategory,
  } = props;

  const [socket, setSocket] = useState(null);
  const { tokenUser: token, uPack } = useSelector((state) => state.userReducer);

  const { isFetchListPackage } = useSelector((state) => state.packageReducer);
  const { t } = useTranslation("package");

  const { listSetting } = useSelector((state) => state.settingReducer);

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  const handleBuyPackage = () => {
    if (packageName === "Subscription") {
      if (token) {
        dispatch(
          saveDataPackage({
            packageName,
            packageAvatar,
            packagePrice,
            packageFreeTicketTournament,
            packageReduceWatchAds,
            id,
          })
        );
        dispatch(
          toggleCheckWallet({
            type: "subscription",
            gold: packagePrice || 19.99,
            total: 1,
          })
        );
        dispatch(getIdPackage(id));
      }
    }
    if (packageName === "Combo Extra 1") {
      if (token) {
        dispatch(
          saveDataPackage({
            packageName,
            packageAvatar,
            packagePrice,
            packageFreeTicketTournament,
            packageReduceWatchAds,
            id,
          })
        );
        dispatch(
          toggleCheckWallet({
            type: "combo1",
            gold: packagePrice || 0.99,
            total: packageFreeTicketTournament || 5,
          })
        );
        dispatch(getIdPackage(id));
      }
    }
    if (packageName === "Combo Extra 2") {
      if (token) {
        dispatch(
          saveDataPackage({
            packageName,
            packageAvatar,
            packagePrice,
            packageFreeTicketTournament,
            packageReduceWatchAds,
            id,
          })
        );
        dispatch(
          toggleCheckWallet({
            type: "combo2",
            gold: packagePrice || 3.96,
            total: packageFreeTicketTournament || 20,
          })
        );
        dispatch(getIdPackage(id));
      }
    }
    if (token === null || token === "") {
      dispatch(toggleLoginDialog());
      return;
    }
  };
  const theme = useTheme();

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  return (
    <>
      <Box
        sx={{
          background:
            packageName === "Combo Extra 1"
              ? "linear-gradient(180deg, #B8CCDF 0%, #CBDBF0 100%), #0F041D "
              : "" || packageCategory === "sub"
              ? "linear-gradient(215deg, #EB6FFF 7.26%, #82F0FF 34.46%, #A470FF 53.35%, #3CC4E2 68.88%, #C271FF 86.45%, #3CC4E2 100%)"
              : "" || packageCategory === "normal"
              ? "linear-gradient(0deg, #F3CA78 0%, #F3CA78 100%), linear-gradient(180deg, #FDCD6D 0%, #FF7765 100%), #0F041D"
              : "",
          padding: "14px 20px 20px 20px",
          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          marginLeft: "8px",
          marginRight: "8px",
          height: "fit-content",
          // minWidth: width > 576 && width < 1200 ? "100%" : "315px",
          marginBottom: "20px",
          // maxWidth: width > 576 && width < 1200 ? "315px" : "unset",
          marginTop: width < 1200 ? "25px" : "unset",
          width: "300px",
          minHeight: "550px",
        }}
        className={
          packageName === "Combo Extra 1"
            ? "gradient-border-rounded"
            : "" || packageCategory === "sub"
            ? "gradient-border-rounded1"
            : "" || packageCategory === "normal"
            ? "gradient-border-rounded2"
            : ""
        }
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: width < 1200 ? "20px" : "20px",
            marginTop: "15px",
            marginBottom: "10px !important",
            color: "white",
            textOverflow: "ellipsis",
            fontWeight: "600",
          }}
        >
          {packageName}
        </Typography>
        <Box
          className="card"
          sx={{
            backgroundColor: "#0F041D",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "10px",
            width: "100%",
            height: "480px",
            border: "none",
            padding: "6px 12px",
          }}
        >
          <Box
            className="title"
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: "100%",
                justifyContent: "space-between",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isFetchListPackage ? (
                  <BannerLoading
                    width={width < 1200 && width > 576 ? 130 : 200}
                    height={width < 1200 && width > 576 ? 130 : 170}
                  />
                ) : (
                  <LazyLoadComponent>
                    <Box
                      sx={{
                        width: "130px",
                        height: "115px",
                        marginTop: "10px",
                      }}
                      component={"img"}
                      src={
                        packageAvatar
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            packageAvatar
                          : images.christbg
                      }
                      alt="..."
                    ></Box>
                  </LazyLoadComponent>
                )}
              </Box>
              <Box>
                <Typography sx={{ color: "#FF7A00", fontWeight: "700" }}>
                  Happy First Month
                </Typography>
                <Typography sx={{ color: "#FF7A00", fontWeight: "700" }}>
                  Enjoy Double Play{" "}
                </Typography>
              </Box>
              {/* salse */}
              <Box
                sx={{
                  marginBottom: "0px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "15px",
                    marginTop: packageCategory === "sub" ? "10px" : "25px",
                  }}
                >
                  {packageCategory === "sub" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="15"
                      viewBox="0 0 19 22"
                      fill="none"
                    >
                      <path
                        d="M18.0751 13.672C18.0749 13.67 18.0748 13.6679 18.0746 13.666C17.9983 12.8028 17.8032 12.0698 17.4611 11.3619C17.4565 11.3512 17.4515 11.3406 17.4461 11.33C17.4266 11.2916 15.504 7.4647 16.4042 5.3616C16.4854 5.17186 16.446 4.96164 16.2991 4.80034C16.1521 4.63903 15.917 4.5479 15.6707 4.55646C15.6047 4.55881 14.26 4.61968 12.8336 5.64357C11.5852 3.54212 11.3881 1.30958 11.3861 1.28522C11.3692 1.07407 11.2186 0.885463 10.9887 0.787542C10.7587 0.689582 10.483 0.696691 10.261 0.806003C8.29093 1.77688 6.76903 2.96174 5.73762 4.32774C4.90481 5.43064 4.39125 6.64886 4.21117 7.94861C4.10304 8.72935 4.12873 9.44335 4.2085 10.0432C4.24544 10.321 3.90523 10.53 3.58815 10.4242L1.67629 9.78603C1.54597 9.74252 1.40337 9.72443 1.26434 9.74268C0.971613 9.78114 0.743555 9.9525 0.665472 10.1742C0.491977 10.6666 0.362054 11.1217 0.268226 11.5655C-0.0583638 13.1111 0.0752729 14.694 0.65453 16.1434C1.23691 17.6004 2.24188 18.8551 3.56082 19.7719C5.11955 20.8554 7.00714 21.407 9.06551 21.407C10.2013 21.407 11.3892 21.2391 12.6023 20.8998C14.5266 20.3617 16.0507 19.2958 17.0095 17.8174C17.8065 16.5886 18.1849 15.1164 18.0751 13.672Z"
                        fill="#FF641A"
                      />
                      <path
                        d="M18.0742 13.666C17.9979 12.8028 17.8028 12.0698 17.4607 11.3619C17.4561 11.3512 17.4512 11.3406 17.4458 11.33C17.4262 11.2916 15.5036 7.46471 16.4038 5.3616C16.485 5.17186 16.4456 4.96164 16.2987 4.80034C16.1517 4.63903 15.9166 4.5479 15.6703 4.55646C15.6117 4.55852 14.5453 4.60676 13.3087 5.33393C13.0526 5.48453 12.6904 5.40212 12.5674 5.16495C11.5561 3.21669 11.3875 1.30772 11.3857 1.28522C11.3688 1.07407 11.2182 0.885463 10.9883 0.787542C10.7583 0.689582 10.4826 0.696691 10.2606 0.806003C9.86793 0.999501 9.49341 1.20164 9.13672 1.41187V21.4063C10.2508 21.3994 11.4141 21.2319 12.6018 20.8998C14.5261 20.3617 16.0502 19.2958 17.009 17.8174C17.8061 16.5886 18.1845 15.1164 18.0747 13.672C18.0745 13.67 18.0744 13.6679 18.0742 13.666Z"
                        fill="#FF001E"
                      />
                      <path
                        d="M11.1059 8.71017C10.9181 8.48165 10.5653 8.38474 10.2465 8.4747C9.92773 8.5645 9.72314 8.81819 9.74825 9.09256C9.83682 10.0611 9.71814 12.909 8.06707 13.2783C6.66153 13.5929 5.9118 13.0617 5.83897 13.0066C5.65671 12.8445 5.38919 12.7831 5.12647 12.8345C4.86197 12.8864 4.66203 13.0596 4.59148 13.274C4.57747 13.3165 4.45319 13.6966 4.4008 13.9441C4.0649 15.534 4.70189 17.1094 6.06326 18.0557C6.86176 18.6107 7.82485 18.8934 8.87191 18.8934C9.44309 18.8934 10.0394 18.8092 10.6472 18.6392C11.6265 18.3653 12.4639 17.786 13.0688 16.9638C13.5748 16.276 13.869 15.4736 13.8761 14.7622C13.8942 12.9318 13.0399 11.0653 11.1059 8.71017Z"
                        fill="#FFEB00"
                      />
                      <path
                        d="M10.2444 8.4747C9.92562 8.5645 9.72103 8.81819 9.74613 9.09256C9.80936 9.78394 9.76678 11.4329 9.13672 12.4544V18.8867C9.62591 18.8646 10.1313 18.783 10.6451 18.6392C11.6245 18.3653 12.4618 17.786 13.0667 16.9638C13.5727 16.2761 13.8669 15.4736 13.8741 14.7622C13.8922 12.9318 13.0378 11.0653 11.1038 8.71017C10.916 8.48165 10.5631 8.38474 10.2444 8.4747Z"
                        fill="#FFBB00"
                      />
                    </svg>
                  ) : (
                    <BgWithTooltip
                      title="Promotion Extra: The extra you will use in all promotion"
                      placement="bottom-start"
                      enterTouchDelay={0}
                      sx={{
                        color: "white",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="15"
                        viewBox="0 0 19 22"
                        fill="none"
                      >
                        <path
                          d="M18.0751 13.672C18.0749 13.67 18.0748 13.6679 18.0746 13.666C17.9983 12.8028 17.8032 12.0698 17.4611 11.3619C17.4565 11.3512 17.4515 11.3406 17.4461 11.33C17.4266 11.2916 15.504 7.4647 16.4042 5.3616C16.4854 5.17186 16.446 4.96164 16.2991 4.80034C16.1521 4.63903 15.917 4.5479 15.6707 4.55646C15.6047 4.55881 14.26 4.61968 12.8336 5.64357C11.5852 3.54212 11.3881 1.30958 11.3861 1.28522C11.3692 1.07407 11.2186 0.885463 10.9887 0.787542C10.7587 0.689582 10.483 0.696691 10.261 0.806003C8.29093 1.77688 6.76903 2.96174 5.73762 4.32774C4.90481 5.43064 4.39125 6.64886 4.21117 7.94861C4.10304 8.72935 4.12873 9.44335 4.2085 10.0432C4.24544 10.321 3.90523 10.53 3.58815 10.4242L1.67629 9.78603C1.54597 9.74252 1.40337 9.72443 1.26434 9.74268C0.971613 9.78114 0.743555 9.9525 0.665472 10.1742C0.491977 10.6666 0.362054 11.1217 0.268226 11.5655C-0.0583638 13.1111 0.0752729 14.694 0.65453 16.1434C1.23691 17.6004 2.24188 18.8551 3.56082 19.7719C5.11955 20.8554 7.00714 21.407 9.06551 21.407C10.2013 21.407 11.3892 21.2391 12.6023 20.8998C14.5266 20.3617 16.0507 19.2958 17.0095 17.8174C17.8065 16.5886 18.1849 15.1164 18.0751 13.672Z"
                          fill="#FF641A"
                        />
                        <path
                          d="M18.0742 13.666C17.9979 12.8028 17.8028 12.0698 17.4607 11.3619C17.4561 11.3512 17.4512 11.3406 17.4458 11.33C17.4262 11.2916 15.5036 7.46471 16.4038 5.3616C16.485 5.17186 16.4456 4.96164 16.2987 4.80034C16.1517 4.63903 15.9166 4.5479 15.6703 4.55646C15.6117 4.55852 14.5453 4.60676 13.3087 5.33393C13.0526 5.48453 12.6904 5.40212 12.5674 5.16495C11.5561 3.21669 11.3875 1.30772 11.3857 1.28522C11.3688 1.07407 11.2182 0.885463 10.9883 0.787542C10.7583 0.689582 10.4826 0.696691 10.2606 0.806003C9.86793 0.999501 9.49341 1.20164 9.13672 1.41187V21.4063C10.2508 21.3994 11.4141 21.2319 12.6018 20.8998C14.5261 20.3617 16.0502 19.2958 17.009 17.8174C17.8061 16.5886 18.1845 15.1164 18.0747 13.672C18.0745 13.67 18.0744 13.6679 18.0742 13.666Z"
                          fill="#FF001E"
                        />
                        <path
                          d="M11.1059 8.71017C10.9181 8.48165 10.5653 8.38474 10.2465 8.4747C9.92773 8.5645 9.72314 8.81819 9.74825 9.09256C9.83682 10.0611 9.71814 12.909 8.06707 13.2783C6.66153 13.5929 5.9118 13.0617 5.83897 13.0066C5.65671 12.8445 5.38919 12.7831 5.12647 12.8345C4.86197 12.8864 4.66203 13.0596 4.59148 13.274C4.57747 13.3165 4.45319 13.6966 4.4008 13.9441C4.0649 15.534 4.70189 17.1094 6.06326 18.0557C6.86176 18.6107 7.82485 18.8934 8.87191 18.8934C9.44309 18.8934 10.0394 18.8092 10.6472 18.6392C11.6265 18.3653 12.4639 17.786 13.0688 16.9638C13.5748 16.276 13.869 15.4736 13.8761 14.7622C13.8942 12.9318 13.0399 11.0653 11.1059 8.71017Z"
                          fill="#FFEB00"
                        />
                        <path
                          d="M10.2444 8.4747C9.92562 8.5645 9.72103 8.81819 9.74613 9.09256C9.80936 9.78394 9.76678 11.4329 9.13672 12.4544V18.8867C9.62591 18.8646 10.1313 18.783 10.6451 18.6392C11.6245 18.3653 12.4618 17.786 13.0667 16.9638C13.5727 16.2761 13.8669 15.4736 13.8741 14.7622C13.8922 12.9318 13.0378 11.0653 11.1038 8.71017C10.916 8.48165 10.5631 8.38474 10.2444 8.4747Z"
                          fill="#FFBB00"
                        />
                      </svg>
                    </BgWithTooltip>
                  )}
                  {packageCategory === "sub" ? (
                    <Box>
                      {listSetting?.saleValue && listSetting?.saleValue >= 1 ? (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#FF7A00",
                            fontWeight: "700",
                            marginLeft: "4px !important",
                            textAlign: "left",
                          }}
                        >
                          {Number(packageFreeTicketTournament) *
                            Number(listSetting?.saleValue || 1)}{" "}
                          {"Free extra/day"}
                        </Typography>
                      ) : (
                        <></>
                      )}
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "11px",
                          color: "white",
                          textDecorationLine:
                            listSetting?.saleValue &&
                            listSetting?.saleValue >= 1
                              ? "line-through"
                              : "unset",
                          fontWeight: "700 !important",
                          marginLeft: "4px !important",
                          textAlign: "start",
                        }}
                      >
                        {packageFreeTicketTournament} {t(`Free extra/day`)}
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      {" "}
                      {listSetting?.saleValue && listSetting?.saleValue >= 1 ? (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#FF7A00",
                            fontWeight: "700",
                            marginLeft: "4px !important",
                          }}
                        >
                          {Number(packageFreeTicketTournament) *
                            Number(listSetting?.saleValue || 1)}{" "}
                          {t("Extra plays")}
                        </Typography>
                      ) : (
                        <></>
                      )}
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "11px",
                          color: "white",
                          textAlign: "start",
                          fontWeight: "700 !important",
                          marginLeft: "6px !important",
                          textDecorationLine:
                            listSetting?.saleValue &&
                            listSetting?.saleValue >= 1
                              ? "line-through"
                              : "unset",
                        }}
                      >
                        {Number(packageFreeTicketTournament)} {t("Extra plays")}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box>
                {isJson(des) &&
                JSON.parse(des) &&
                JSON.parse(des)?.length > 0 ? (
                  JSON.parse(des)?.map((d, i_d) => (
                    <Box
                      key={i_d}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginBottom: "5px",
                        marginTop:
                          packageName === "Subscription" ? "0px" : "5px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <g>
                          <path
                            fill="#14C58A"
                            d="M9.058.548a8.297 8.297 0 108.297 8.296A8.306 8.306 0 009.058.548z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M14.283 6.046l-4.952 5.446a.78.78 0 01-.489.231.86.86 0 01-.546-.12L4.76 9.31c-.312-.202-.363-.572-.113-.824.25-.253.705-.294 1.017-.092l2.95 1.912 4.504-4.955c.148-.18.406-.279.671-.259.265.02.495.158.598.357a.5.5 0 01-.104.596z"
                          ></path>
                        </g>
                      </svg>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "14px",
                          color: "#fff",
                          textAlign: "start",
                          fontWeight: "700 !important",
                          marginLeft: "6px !important",
                        }}
                      >
                        {d}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <></>
                )}
              </Box>
              <Box
                className="mb-2"
                sx={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "900 !important",
                    fontSize: "20px !important",
                  }}
                >
                  ${packagePrice}
                </Typography>
                {packageCategory === "sub" ? (
                  <Typography
                    sx={{
                      fontWeight: "700 !important",
                      fontSize: "12px !important",
                      color: "#979797",
                      marginTop: "5px !important",
                    }}
                  >
                    {t("Only $0.67/ day")}
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
              <Typography
                sx={{
                  fontSize: width < 1200 && width > 576 ? "8px" : "12px",
                  color: "#7848ED",
                }}
              >
                Sale period:{" "}
                {listSetting?.saleValue && listSetting?.saleValue > 1
                  ? `${moment(listSetting?.saleStartAt || new Date())?.format(
                      "MM/DD/YYYY"
                    )} - ${moment(listSetting?.saleEndAt || new Date())?.format(
                      "MM/DD/YYYY"
                    )}`
                  : ""}
              </Typography>
              <Box
                sx={{ marginTop: "6px", width: "100%", marginBottom: "20px" }}
              >
                <AnimButton
                  upperCase={false}
                  text={t("Buy Now")}
                  type={"primary"}
                  onClick={handleBuyPackage}
                  style={{
                    padding: "4px 3px",
                    color: "white",
                    background: "#9747FF",
                    backdropFilter: " blur(4px)",
                    fontSize: "11px ",
                  }}
                ></AnimButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={"saleMobile"}>
          {packageCategory === "sub" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="80"
              fill="none"
              viewBox="0 0 123 113"
            >
              <g filter="url(#filter0_d_3152_19856)">
                <path
                  fill="#F19D1F"
                  d="M48.861 23.943l52.783 38.912v43.505L4.133 23.942l44.728.001z"
                ></path>
              </g>
              <path
                fill="#fff"
                d="M33.632 39.151l-5.089-4 7.127-9.067 4.919 3.867c.714.562 1.127 1.234 1.243 2.01.104.778-.107 1.502-.639 2.179-.7.891-1.7 1.292-2.726 1.1.354.513.508 1.084.457 1.709-.051.624-.295 1.22-.737 1.783-.577.733-1.284 1.139-2.122 1.216-.85.08-1.655-.185-2.433-.797zm2.386-4.426l-2.548-2.003-1.914 2.434 2.548 2.003c.386.303.796.432 1.22.387.418-.05.772-.253 1.055-.613.279-.355.382-.733.322-1.139-.066-.41-.298-.766-.683-1.069zm.364-5.708l-1.71 2.175 2.447 1.924c.677.532 1.466.426 1.958-.2.502-.639.428-1.443-.248-1.975l-2.447-1.924zm9.32 15.367l-4.73-3.718c-.24.425-.263.908-.066 1.452.185.544.546 1.022 1.084 1.445.65.512 1.258.754 1.833.725l.2 1.672c-1.163.139-2.289-.225-3.39-1.1-1.088-.856-1.72-1.874-1.894-3.044-.174-1.17.13-2.26.93-3.279.761-.967 1.692-1.514 2.788-1.645 1.095-.13 2.124.187 3.104.957.973.766 1.521 1.708 1.642 2.816.117 1.114-.22 2.168-1.006 3.167a6.128 6.128 0 01-.495.552zm-3.71-4.962l2.94 2.311c.3-.368.418-.766.347-1.21-.075-.438-.316-.821-.72-1.14a2.093 2.093 0 00-1.328-.47 1.747 1.747 0 00-1.239.509zm9.256 10.437c-.502.639-1.152.946-1.94.92-.793-.02-1.613-.368-2.467-1.04-1.005-.79-1.621-1.775-1.849-2.956l1.662-.33c.172.677.6 1.29 1.277 1.822.708.557 1.323.712 1.581.383.244-.31-.019-.73-.618-1.53-.08-.093-.14-.16-.17-.214a8.988 8.988 0 01-.578-.864 4.374 4.374 0 01-.374-.877c-.224-.678-.098-1.346.404-1.984.497-.633 1.123-.948 1.868-.946.745.003 1.516.323 2.332.964.942.74 1.49 1.643 1.658 2.705l-1.669.314c-.12-.575-.474-1.088-1.054-1.534-.683-.537-1.154-.641-1.412-.312-.134.17-.125.393.059.731.083.168.162.302.232.408.064.101.173.248.323.448.286.378.508.707.671.968.152.262.298.571.436.915.261.697.13 1.37-.372 2.01zm8.311-3.623l-1.371 1.745 1.903 1.495-1.05 1.334-1.902-1.496-2.39 3.041c-.354.45-.298.964.132 1.302.266.208.563.299.887.277l.202 1.5c-.813.291-1.776.086-2.567-.535-.6-.472-.962-1.053-1.073-1.744-.118-.696.053-1.33.515-1.918l2.574-3.274-1.17-.92 1.05-1.334 1.169.92.855-1.088 2.236.695zm5.785 17.845l-1.903-1.496 3.22-12.137 1.954 1.536-2.533 9.22 8.343-4.653 1.96 1.541-11.04 5.99zm5.354 1.335c.522-.664 1.253-.969 2.182-.914.928.055 1.864.453 2.812 1.198.373.293.683.588.942.884l.273-.348c.194-.246.232-.554.11-.906-.13-.357-.387-.693-.785-1.006a3.983 3.983 0 00-2.31-.874l-.02-1.653c.547-.071 1.156-.001 1.818.212.656.219 1.268.547 1.837.994.847.666 1.378 1.421 1.588 2.261.21.84.059 1.59-.458 2.248l-3.43 4.362-1.72-1.351.478-.607c-.925.07-1.783-.205-2.575-.837-.657-.517-1.055-1.117-1.194-1.799-.14-.682.01-1.301.452-1.864zm4.229 1.544c-.462-.363-.905-.567-1.323-.62-.419-.053-.738.054-.942.313-.164.209-.199.447-.107.734.092.287.271.54.555.764.411.323.862.453 1.346.383.48-.063.896-.319 1.249-.768a3.667 3.667 0 00-.778-.806zm5.595 6.558l-.027 1.635c-.743.112-1.424-.076-2.037-.558-.575-.452-.91-1.002-.994-1.65-.083-.649.096-1.255.544-1.824l5.964-7.586 1.72 1.352-5.865 7.46c-.274.348-.226.743.121 1.016.165.13.36.18.574.155zm1.9.03l3.166-4.027 1.72 1.352-2.903 3.692c-.343.436-.5.896-.46 1.367.027.471.246.869.651 1.187a1.69 1.69 0 001.41.352c.516-.096.957-.383 1.34-.87l2.768-3.522 1.726 1.357-5.09 6.474-1.725-1.357.517-.657c-.957.097-1.829-.16-2.608-.782-.759-.596-1.183-1.319-1.272-2.156-.095-.841.158-1.645.76-2.41zm14.034 10.736l-4.73-3.718c-.24.424-.263.908-.066 1.452.185.544.546 1.022 1.083 1.445.652.512 1.259.754 1.834.725l.2 1.671c-1.163.14-2.289-.224-3.39-1.1-1.088-.855-1.72-1.873-1.894-3.043-.174-1.17.13-2.26.93-3.279.761-.967 1.692-1.514 2.787-1.645 1.096-.131 2.125.187 3.105.957.973.766 1.521 1.708 1.642 2.816.117 1.114-.221 2.168-1.006 3.167a6.101 6.101 0 01-.495.552zm-3.71-4.962l2.94 2.311c.3-.368.418-.766.347-1.21-.075-.438-.316-.821-.72-1.14a2.092 2.092 0 00-1.328-.47 1.746 1.746 0 00-1.24.509z"
              ></path>
              <defs>
                <filter
                  id="filter0_d_3152_19856"
                  width="104.1"
                  height="89.006"
                  x="0.839"
                  y="23.942"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  ></feColorMatrix>
                  <feOffset dy="3.294"></feOffset>
                  <feGaussianBlur stdDeviation="1.647"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
                  <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3152_19856"
                  ></feBlend>
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3152_19856"
                    result="shape"
                  ></feBlend>
                </filter>
              </defs>
            </svg>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
}
