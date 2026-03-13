import RazorpayCheckout from "react-native-razorpay";
import { getUserId } from "../context/AuthContext";
import { SchemeType } from "../components/SchemeComponents/SchemeData";
import { VerifypaymentType } from "../Types/RazorpayTypes";
import { logger } from "../utils/logger";
import { BackendAPI } from "../components/common";

type OrderResponse = {
  id: string;
  amount: number;
  currency: string;
};

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type RazorpayResult = {
  status: number;
  orderResponse: any;
  verifyPaymentResponse: any;
};

export async function startPayment(
  schemeData: SchemeType,
  userId: any,
  isNewSubscription: boolean,
  installmentId: string | undefined,
  accessToken: string,
) {
  try {
    const res = await fetch(`${BackendAPI}/razorpay/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ amount: schemeData.price_per_month }),
    });

    const order: OrderResponse = await res.json();
    // console.log("Avinash  Kumar : ", process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID);
    console.log("Avinash  Kumar : ", order);
    const options = {
      key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Sri Dhanalakshmi Jewellers",
      description: "Installment Payment",
      order_id: order.id,

      theme: {
        color: "#2E7D32",
      },
    };
    try {
      const data = await RazorpayCheckout.open(options);
      if (data) {
        console.log("Payment success:", data);

        const paymentVerification = await verifyPayment(
          data,
          schemeData,
          userId,
          isNewSubscription,
          installmentId,
          accessToken,
        );
        console.log(paymentVerification);

        const result: RazorpayResult = {
          status: 1,
          orderResponse: data,
          verifyPaymentResponse: paymentVerification,
        };

        return result;
      }
    } catch (error: any) {
      console.log("Payment failed:", error);

      const errorResult: RazorpayResult = {
        status: 0,
        orderResponse: error,
        verifyPaymentResponse: undefined,
      };

      return errorResult;
    }
  } catch (err) {
    console.log(err);
    const errorResult: RazorpayResult = {
      status: 0,
      orderResponse: err,
      verifyPaymentResponse: undefined,
    };

    return errorResult;
  }
}

const verifyPayment = async (
  payment: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  },
  schemeData: SchemeType,
  userId: string,
  isNewSubscription: boolean,
  installment_id: string,
  accessToken: string,
) => {
  try {
    const body: VerifypaymentType = {
      payment: payment,
      isNewSubscription: isNewSubscription,
      schemeData: schemeData,
      userId: userId,
      installmentId: installment_id,
    };

    logger.debug("VerifyPayment Body : ", body, accessToken);
    const res = await fetch(`${BackendAPI}/razorpay/verify-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    console.log("Verification result:", result);

    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
