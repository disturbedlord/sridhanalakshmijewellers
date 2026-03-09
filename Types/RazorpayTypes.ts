import { SchemeType } from "../components/SchemeComponents/SchemeData";

export type VerifypaymentType = {
  payment: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };
  isNewSubscription: boolean;
  schemeData: SchemeType;
  userId: string;
  installmentId: string;
};
