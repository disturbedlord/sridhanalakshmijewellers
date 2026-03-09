import saving500 from "../../assets/savingSchemes/saving500.png";
import saving1000 from "../../assets/savingSchemes/saving1000.png";
import saving1500 from "../../assets/savingSchemes/saving1500.png";
import saving2000 from "../../assets/savingSchemes/saving2000.png";
import saving2500 from "../../assets/savingSchemes/saving2500.png";
import saving5000 from "../../assets/savingSchemes/saving5000.png";
import saving10000 from "../../assets/savingSchemes/saving10000.png";

export type SchemeType = {
  scheme_id: number;
  name: string;
  price_per_month: number;
  planLength: number;
  gift: string;
  total_amount: number;
  company_contribution: number;
  created_at: string;
  img: any;
};

export const getSchemeData = (schemeId: number): SchemeType | undefined => {
  let result: SchemeType | undefined = undefined;
  schemeData.forEach((item) => {
    if (item.scheme_id === schemeId) {
      result = item;
      return;
    }
  });
  return result;
};

export const schemeData: SchemeType[] = [
  {
    scheme_id: 1,
    name: "500 x 11",
    price_per_month: 500.0,
    planLength: 11,
    gift: "GIFT",
    total_amount: 6000.0,
    company_contribution: 500.0,
    created_at: "2026-03-03 13:13:36",
    img: saving500,
  },
  {
    scheme_id: 2,
    name: "1000 x 11",
    price_per_month: 1000.0,
    planLength: 11,
    gift: "GIFT",
    total_amount: 12000.0,
    company_contribution: 1000.0,
    created_at: "2026-03-03 13:13:36",
    img: saving1000,
  },
  {
    scheme_id: 3,
    name: "1500 x 11",
    price_per_month: 1500.0,
    planLength: 11,
    gift: "GIFT",
    total_amount: 18000.0,
    company_contribution: 1500.0,
    created_at: "2026-03-03 13:13:36",
    img: saving1500,
  },
  {
    scheme_id: 4,
    name: "2000 x 11",
    price_per_month: 2000.0,
    planLength: 11,
    gift: "GIFT",
    total_amount: 24000.0,
    company_contribution: 2000.0,
    created_at: "2026-03-03 13:13:36",
    img: saving2000,
  },
  {
    scheme_id: 5,
    name: "2500 x 11",
    price_per_month: 2500.0,
    planLength: 11,
    gift: "GIFT",
    total_amount: 30000.0,
    company_contribution: 2500.0,
    created_at: "2026-03-03 13:13:36",
    img: saving2500,
  },
  {
    scheme_id: 6,
    name: "5000 x 11",
    price_per_month: 5000.0,
    planLength: 11,
    gift: "GIFT",
    total_amount: 60000.0,
    company_contribution: 5000.0,
    created_at: "2026-03-03 13:13:36",
    img: saving5000,
  },
  {
    scheme_id: 7,
    name: "10000 x 11",
    price_per_month: 10000.0,
    planLength: 11,
    gift: "GIFT",
    total_amount: 120000.0,
    company_contribution: 10000.0,
    created_at: "2026-03-03 13:13:36",
    img: saving10000,
  },
];
