import RazorpayCheckout from "react-native-razorpay";

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

export const startPayment = async (amount: number) => {
  try {
    const res = await fetch("http://192.168.68.102:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    });

    const order: OrderResponse = await res.json();
    // console.log("Avinash  Kumar : ", process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID);
    // console.log("Avinash  Kumar : ", order);
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

        const paymentVerification = await verifyPayment(data);
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
};

const verifyPayment = async (payment: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}) => {
  try {
    const res = await fetch("http://192.168.68.102:5000/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payment),
    });

    const result = await res.json();

    console.log("Verification result:", result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
