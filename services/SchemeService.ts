import { BackendAPI } from "../components/common";
import { MySchemeCard, MySchemeType } from "../components/Pages/SchemeScreen";
import {
  getSchemeData,
  SchemeType,
} from "../components/SchemeComponents/SchemeData";
import { logger } from "../utils/logger";

export const GetAllUserSchemes = async (
  userId: string | undefined,
  accessToken: string | undefined,
) => {
  try {
    if (!userId) return { status: 0, rows: [] };

    const response = await fetch(
      `${BackendAPI}/user/schemes/getAllUserSchemes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId: userId }),
      },
    );

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      // Show error message
      console.log("GetAllUserSchemes failed with error : ", data.message);
      return undefined;
    }
  } catch (error) {
    console.error("GetAllUserSchemes Error:", error);
    return error;
  }
};

export const GetAllInstallments = async (
  schemeId: string,
  accessToken: string,
) => {
  try {
    if (!schemeId || !accessToken) return undefined;

    const response = await fetch(
      `${BackendAPI}/user/schemes/getAllUserInstallments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userSchemeId: schemeId }),
      },
    );

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      // Show error message
      console.log("GetAllInstallments failed with error : ", data.message);
      return undefined;
    }
  } catch (error) {
    console.error("GetAllInstallments Error:", error);
    return error;
  }
};

export const GetSchemeCardDetails = (mySchemes) => {
  console.log("MySchermes : ", mySchemes);
  const myData = [];
  Object.entries(mySchemes).forEach(([id, value]) => {
    console.log("ID:", id);
    console.log("Paid Count:", value, typeof value.completed);
    const schemeId = value.scheme_id;
    const scheme: SchemeType | undefined = getSchemeData(schemeId);
    const getTotalPaidDues = (paid_count: string) => {
      const planLength = scheme?.planLength;
      return `${paid_count}/${planLength}`;
    };
    let myScheme: MySchemeType;
    logger.debug("Value : ", Boolean(value.completed) === true);
    if (value.completed == true) {
      // No Pending Installments
      console.log("HEREHERHER");
      myScheme = {
        amount: `₹ ${scheme?.price_per_month}/Month`,
        userSchemeId: id,
        lastPaidDate: new Date(value.last_paid_date).toLocaleDateString(),
        totalPaidDues: getTotalPaidDues(value.paid_count),
        nextDueDate: "-",
        status: "Completed ✅",
        type: "Monthly",
        // schemeId: schemeId,
      };
    } else {
      console.log("DOWNDOWNDOWN");
      myScheme = {
        amount: `₹ ${scheme?.price_per_month}/Month`,
        userSchemeId: id,
        lastPaidDate: new Date(value.last_paid_date).toLocaleDateString(),
        totalPaidDues: getTotalPaidDues(value.paid_count),
        nextDueDate: new Date(value.next_due_date).toLocaleDateString(),
        status: "Active",
        type: "Monthly",
        schemeId: schemeId,
      };
    }
    myData.push(myScheme);
  });

  return myData;
};
