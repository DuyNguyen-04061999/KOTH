import React from "react";
import Layout from "../Layout";
import EdittedLuckySpin from ".";
import { useSelector } from "react-redux";
import PopupWheel from "../PopupWheel";
import useWindowDimensions from "../../utils/useWindowDimensions";
import LuckySpinMobile from "../SpinMobile/LuckySpinMobile";
import Navigation from "../Navigation";

export default function LuckySpinComponent() {
  const { popupLuckyWheel } = useSelector((state) => state.luckyWheelReducer);
  const { width } = useWindowDimensions();
  return (
    <div>
      <Navigation />
      {popupLuckyWheel && <PopupWheel />}
      {width > 900 ? (
        <Layout children={<EdittedLuckySpin />} />
      ) : (
        <LuckySpinMobile />
      )}
    </div>
  );
}
