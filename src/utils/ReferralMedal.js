import { imagesReferral } from "./imagesReferral";

export const medalListIcon = [
  {
    name: "Bronze",
    src: imagesReferral.BronzeIcon,
    gradient: "linear-gradient(#F9B67D,#F9B67D)",
  },
  {
    name: "Silver",
    src: imagesReferral.SilverIcon,
    gradient: "linear-gradient(#D3E4F2,#D3E4F2)",
  },
  {
    name: "Gold",
    src: imagesReferral.GoldIcon,
    gradient: "linear-gradient(#B2943F,#B2943F)",
  },
  {
    name: "Platinum",
    src: imagesReferral.PlatinumIcon,
    gradient: "linear-gradient(135deg,#59ADBA 50%, #C2DFE3 70%)",
  },
  {
    name: "Diamond",
    src: imagesReferral.DiamondIcon,
    gradient: "linear-gradient(135deg,#9272D4 50%, #B9C7DE 70%)",
  },
  {
    name: "Pinnacle",
    src: imagesReferral.PinnacleIcon,

    gradient: "linear-gradient(45deg,#FDF2D6 30%, #5873B7 50%, #FCD57A 75%)",
  },
];
export const medalSmallIcon = {
  Bronze: {
    imgSrc: imagesReferral.BronzeIconSmall,
    content: (
      <span>
        Bronze tier will get you free merch of your choice (shirt, polo, hoodie,
        sweater, hat, mug, ...)
      </span>
    ),
    bgSrc: imagesReferral.BronzeReward,
  },
  Silver: {
    imgSrc: imagesReferral.SilverIconSmall,
    content: (
      <span>
        Silver tier will get you <span style={{ color: "#FF9F38" }}>$100</span>
      </span>
    ),
    bgSrc: imagesReferral.SilverReward,
  },
  Pinnacle: {
    imgSrc: imagesReferral.PinnacleIconSmall,
    content: (
      <span>
        Pinnacle? (500 Subscribers) will get you{" "}
        <span style={{ color: "#FF9F38" }}>
          $5,000, lifetime membership, invited to functions,...
        </span>
      </span>
    ),
    bgSrc: imagesReferral.PinnacleReward,
  },
  Gold: {
    imgSrc: imagesReferral.GoldIconSmall,
    content: (
      <span>
        Gold tier will get you <span style={{ color: "#FF9F38" }}>$250</span> +{" "}
        <span style={{ color: "#FF9F38" }}>1 month subscription free</span>
      </span>
    ),
    bgSrc: imagesReferral.GoldReward,
  },
  Platinum: {
    imgSrc: imagesReferral.PlatinumIconSmall,
    content: (
      <span>
        Platinum tier will get you{" "}
        <span style={{ color: "#FF9F38" }}>1 year subscription</span>
      </span>
    ),
    bgSrc: imagesReferral.PlatinumReward,
  },
  Diamond: {
    imgSrc: imagesReferral.DiamondIconSmall,
    content: (
      <span>
        Diamond Tier will get you{" "}
        <span style={{ color: "#FF7A00" }}>$1,000</span>
      </span>
    ),
    bgSrc: imagesReferral.DiamondReward,
  },
};
