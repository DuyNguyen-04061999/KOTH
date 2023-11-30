import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ENDED_PROMO_EN from "./en/ended_promo.json";
import GLOBAL_EN from "./en/global.json";
import HELP_CENTER_EN from "./en/help_center.json";
import HOME_EN from "./en/home.json";
import HOT_PROMO_EN from "./en/hot_promo.json";
import JOIN_TOUR_EN from "./en/join_tour.json";
import NAV_EN from "./en/navigation.json";
import ONGOING_PROMO_EN from "./en/ongoing_promo.json";
import PACKAGE_EN from "./en/packages.json";
import STANDARD_PROMO_EN from "./en/standard_promo.json";
import UPCOMING_PROMO_EN from "./en/upcoming_promo.json";
import VIP_PROMO_EN from "./en/vip_promo.json";
import ENDED_PROMO_TUR from "./tur/ended_promo.json";
import GLOBAL_TUR from "./tur/global.json";
import HELP_CENTER_TUR from "./tur/help_center.json";
import HOME_TUR from "./tur/home.json";
import HOT_PROMO_TUR from "./tur/hot_promo.json";
import JOIN_TOUR_TUR from "./tur/join_tour.json";
import NAV_TUR from "./tur/navigation.json";
import ONGOING_PROMO_TUR from "./tur/ongoing_promo.json";
import PACKAGE_TUR from "./tur/packages.json";
import STANDARD_PROMO_TUR from "./tur/standard_promo.json";
import UPCOMING_PROMO_TUR from "./tur/upcoming_promo.json";
import VIP_PROMO_TUR from "./tur/vip_promo.json";
import { store } from "../redux-saga-middleware/config/configRedux";


const {currentLanguage} = store.getState().settingReducer
export const locales = {
  en: "English",
  tur: "Türkçe",
};

const resources = {
  en: {
    global: GLOBAL_EN,
    home: HOME_EN,
    package: PACKAGE_EN,
    help_center: HELP_CENTER_EN,
    join_tour: JOIN_TOUR_EN,
    hot_promo: HOT_PROMO_EN,
    vip_promo: VIP_PROMO_EN,
    standard_promo: STANDARD_PROMO_EN,
    ongoing_promo: ONGOING_PROMO_EN,
    upcoming_promo: UPCOMING_PROMO_EN,
    ended_promo: ENDED_PROMO_EN,
    navigation: NAV_EN,
  },
  tur: {
    global: GLOBAL_TUR,
    home: HOME_TUR,
    package: PACKAGE_TUR,
    help_center: HELP_CENTER_TUR,
    join_tour: JOIN_TOUR_TUR,
    hot_promo: HOT_PROMO_TUR,
    vip_promo: VIP_PROMO_TUR,
    standard_promo: STANDARD_PROMO_TUR,
    ongoing_promo: ONGOING_PROMO_TUR,
    upcoming_promo: UPCOMING_PROMO_TUR,
    ended_promo: ENDED_PROMO_TUR,
    navigation: NAV_TUR,
  },
};

const defaultNS = "global";

i18n.use(initReactI18next).init({
  resources,
  lng:currentLanguage,
  ns: [
    "global",
    "home",
    "package",
    "help_center",
    "join_tour",
    "hot_promo",
    "vip_promo",
    "standard_promo",
    "ongoing_promo",
    "upcoming_promo",
    "ended_promo",
    "navigation",
  ],
  defaultNS: defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
