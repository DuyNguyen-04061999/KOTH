import React from "react";
import { useSelector } from "react-redux";
import EdittedLuckySpin from ".";
import useWindowDimensions from "../../utils/useWindowDimensions";
import MainLayout from "../MainLayout/MainLayout";
import Navigation from "../Navigation";
import PopupWheel from "../PopupWheel";
import LuckySpinMobile from "../SpinMobile/LuckySpinMobile";

export default function LuckySpinComponent() {
  const { popupLuckyWheel } = useSelector((state) => state.luckyWheelReducer);
  const { width } = useWindowDimensions();
  return (
    <div>
      <Navigation />
      {popupLuckyWheel && <PopupWheel />}
      {width > 900 ? (
        <MainLayout children={<EdittedLuckySpin />} />
      ) : (
        <LuckySpinMobile />
      )}
    </div>
  );
}
