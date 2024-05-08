import { Box, Tooltip, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
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
import {
  openRenewalNotiPopup,
  toggleCheckWallet,
} from "../../../../redux-saga-middleware/reducers/walletReducer";
import { images } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
  },
})(Tooltip);

export const Type = {
  Subscription: "sub",
  Value: "normal value",
  Standard: "normal standard",
};

export const PackageName = {
  Monthly: "Monthly Subscription",
  Value: "Value Extra Pack",
  Standard: "Standard Extra Pack",
  Quarterly: "Quarterly Subscription",
  Halfyear: "Half-year Subscription",
  Yearly: "Yearly Subscription",
};

export default function ListPackage(props) {
  const {
    packageName,
    packageAvatar,
    packagePrice,
    packageFreeTicketTournament,
    packageReduceWatchAds,
    id,
    des,
    packageCategory,
    packageTimeLoop,
  } = props;
  // const packageCategory = 'prenium flow'
  const [socket, setSocket] = useState(null);
  const { tokenUser: token, uPack } = useSelector((state) => state.userReducer);

  const { isFetchListPackage } = useSelector((state) => state.packageReducer);
  const { t } = useTranslation("package");

  const { listSetting } = useSelector((state) => state.settingReducer);
  const { device } = useSelector((state) => state.deviceReducer);

  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  const handleBuyPackage = () => {
    if (token === null || token === "" || token === undefined) {
      dispatch(toggleLoginDialog());
    } else {
      if (token) {
        if (packageCategory === "sub") {
          dispatch(
            saveDataPackage({
              packageName,
              packageAvatar,
              packagePrice,
              packageFreeTicketTournament,
              packageReduceWatchAds,
              id,
              packageCategory,
              packageTimeLoop,
            })
          );
          dispatch(
            openRenewalNotiPopup({
              type: packageCategory,
              gold: packagePrice,
              total: packageFreeTicketTournament,
            })
          );
          dispatch(getIdPackage(id));
          ReactGA.event("start_subscription", {
            category: "start_subscription",
            action: "click",
            nonInteraction: true,
            transport: "xhr",
          });
        } else {
          dispatch(
            saveDataPackage({
              packageName,
              packageAvatar,
              packagePrice,
              packageFreeTicketTournament,
              packageReduceWatchAds,
              id,
              packageCategory,
              packageTimeLoop,
            })
          );
          dispatch(
            toggleCheckWallet({
              type: packageCategory,
              gold: packagePrice,
              total: packageFreeTicketTournament,
            })
          );
          dispatch(getIdPackage(id));
          ReactGA.event("start_subscription", {
            category: "start_subscription",
            action: "click",
            nonInteraction: true,
            transport: "xhr",
          });
        }
      }
      if (!uPack || (uPack && uPack?.remain === "Expired")) {
        dispatch(
          saveDataPackage({
            packageName,
            packageAvatar,
            packagePrice,
            packageFreeTicketTournament,
            packageReduceWatchAds,
            id,
            packageCategory,
            packageTimeLoop,
          })
        );
        dispatch(
          toggleCheckWallet({
            type: packageCategory,
            gold: packagePrice,
            total: packageFreeTicketTournament,
          })
          // openRenewalNotiPopup({
          //   type: packageCategory,
          //   gold: packagePrice,
          //   total: packageFreeTicketTournament,
          // })
        );
        dispatch(getIdPackage(id));
        ReactGA.event("start_subscription", {
          category: "start_subscription",
          action: "click",
          nonInteraction: true,
          transport: "xhr",
        });
      }
    }
  };

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  return (
    <Box
      sx={{
        background:
          packageName === PackageName?.Standard
            ? "linear-gradient(180deg, #0F041D 69.35%, #40464D 99.97%)"
            : "" || packageName === PackageName.Monthly
            ? "linear-gradient(180deg, #0F041D 69.58%, #083843 99.91%)"
            : "" || packageName === PackageName.Value
            ? "linear-gradient(180deg, #0F041D 69.35%, #4D3911 99.97%)"
            : "" || packageName === PackageName.Quarterly
            ? "linear-gradient(180deg, #0F041D 69.58%, #460167 99.91%)"
            : "" || packageName === PackageName.Halfyear
            ? "linear-gradient(180deg, #0F041D 69.58%, #3C1205 99.91%)"
            : "" || packageName === PackageName.Yearly
            ? "linear-gradient(180deg, #0F041D 69.58%, #410634 99.91%)"
            : "",
        padding: "20px",
        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        height: "fit-content",
        marginBottom: "20px",
        marginTop: width < 1200 ? "25px" : "25px",
        width: "300px",
        minHeight:
          packageName === PackageName?.Standard ||
          packageName === PackageName?.Value
            ? "504px"
            : "553px",
      }}
      className={
        packageName === PackageName?.Standard
          ? "gradient-border-rounded"
          : "" || packageName === PackageName.Monthly
          ? "gradient-border-rounded1"
          : "" || packageName === PackageName.Value
          ? "gradient-border-rounded2"
          : "" || packageName === PackageName.Quarterly
          ? "gradient-border-rounded3"
          : "" || packageName === PackageName.Halfyear
          ? "gradient-border-rounded4"
          : "" || packageName === PackageName.Yearly
          ? "gradient-border-rounded5"
          : ""
      }
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "20px",
          marginBottom: "10px !important",
          color: "white",
          textOverflow: "ellipsis",
          fontWeight: "bold !important",
        }}
      >
        {packageName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          width: "100%",
          height:
            packageName === PackageName?.Standard ||
            packageName === PackageName?.Value
              ? "430px"
              : "490px",
          border: "none",
          padding: "6px 12px",
          position: "relative",
        }}
      >
        <Box
          className="title"
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
              justifyContent: "flex-end",
              paddingLeft: "10px",
              paddingRight: "10px",
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
                      width: "100%",
                      height: "100%",
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

            {/* salse */}
            <Box
              sx={{
                transform: "translate(0px,-34px)",
                minHeight: packageCategory === "sub" ? "25%" : "20%",
                overflow: "auto",
                maxHeight: packageCategory === "sub" ? "25%" : "20%",
              }}
            >
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
                    // marginBottom: "15px",
                    // marginTop:
                    //   packageCategory === Type.Subscription ? "10px" : "25px",
                  }}
                >
                  {/* {packageCategory === Type.Subscription ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="23"
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
                        width="15"
                        height="18"
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
                  {packageCategory === Type.Subscription ? (
                    <Box>
                      {listSetting?.saleValue && listSetting?.saleValue > 1 ? (
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
                          fontSize: "16px",
                          color: "#FF7A00",
                          textDecorationLine:
                            listSetting?.saleValue && listSetting?.saleValue > 1
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
                      {listSetting?.saleValue && listSetting?.saleValue > 1 ? (
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
                          fontSize: "16px",
                          color: "#FF7A00",
                          textAlign: "start",
                          fontWeight: "700 !important",
                          marginLeft: "6px !important",
                          textDecorationLine:
                            listSetting?.saleValue && listSetting?.saleValue > 1
                              ? "line-through"
                              : "unset",
                        }}
                      >
                        {Number(packageFreeTicketTournament)} {t("Extra plays")}
                      </Typography>
                    </Box>
                  )} */}
                </Box>
              </Box>
              <Box className="mt-3">
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
                          packageCategory === Type.Subscription ? "0px" : "5px",
                        overflow: "auto",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 18 18"
                        style={{ minWidth: "12px" }}
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
                          fontWeight: "500 !important",
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
              {packageCategory === Type.Subscription ? (
                <>
                  {packageName === "Monthly Subscription" ? (
                    <Typography
                      sx={{
                        fontWeight: "700 !important",
                        fontSize: "12px !important",
                        color: "#979797",
                        marginTop: "5px !important",
                        textDecoration: "line-through",
                      }}
                    >
                      {t(`$19.99`)}
                    </Typography>
                  ) : packageName === "Quarterly Subscription" ? (
                    <Typography
                      sx={{
                        fontWeight: "700 !important",
                        fontSize: "12px !important",
                        color: "#979797",
                        marginTop: "5px !important",
                        textDecoration: "line-through",
                      }}
                    >
                      {t(`$56.99`)}
                    </Typography>
                  ) : packageName === "Yearly Subscription" ? (
                    <Typography
                      sx={{
                        fontWeight: "700 !important",
                        fontSize: "12px !important",
                        color: "#979797",
                        marginTop: "5px !important",
                        textDecoration: "line-through",
                      }}
                    >
                      {t(`$215.99`)}
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: "700 !important",
                        fontSize: "12px !important",
                        color: "#979797",
                        marginTop: "5px !important",
                        textDecoration: "line-through",
                      }}
                    >
                      {/* {t(
                    `Only ${(packagePrice / packageTimeLoop).toFixed(2)}/days`
                  )} */}
                      {t(`$${packagePrice}`)}
                    </Typography>
                  )}
                  {packageName === "Quarterly Subscription" ? (
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      (SAVE 5%)
                    </Typography>
                  ) : packageName === "Yearly Subscription" ? (
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      (SAVE 10%)
                    </Typography>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </Box>
            {listSetting?.saleValue && listSetting?.saleValue > 1 ? (
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
            ) : (
              <></>
            )}
            <Box sx={{ marginTop: "6px", width: "100%", marginBottom: "4px" }}>
              <AnimButton
                upperCase={false}
                text={t("Buy Now")}
                type={"primary"}
                // type={"disable"}
                onClick={handleBuyPackage}
                style={{
                  padding: "8px 3px",
                  color: "white",
                  background: "#BE48ED",
                  backdropFilter: " blur(4px)",
                  fontSize: "16px ",
                }}
              ></AnimButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={"saleMobile"}>
        {packageCategory === "sub" ? (
          <>
            <Box
              component={"img"}
              src={images.badgeBigSale}
              alt="..."
              sx={{ width: "70%", height: "100%" }}
            ></Box>
            <Box
              sx={{
                position: "absolute",
                top: 9,
                right: "36px",
                transform: "rotateZ(49deg)",
                zIndex: 3,
              }}
            >
              <Typography
                sx={{
                  marginBottom: "0px !important",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                ON
              </Typography>
              <Typography
                sx={{
                  marginBottom: "0px !important",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                SALE
              </Typography>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
