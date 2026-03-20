import { GenericError } from "../APIHelper/commonMethods.js";
import { LogError } from "../Logger/LogHelper.js";
import { logger } from "../pinoLogger.js";
import {
  CreateSchemeSubscription,
  MarkInstallmentStatus,
} from "./common/Schemes.js";
import { MarkPaymentStatus } from "./razorpay.js";

export const CreateInstallment = async (req, res) => {
  try {
    const { payment, isNewSubscription, schemeData, userId } = req.body;
    console.log(req.body);
    if (isNewSubscription === true) {
      const res = await CreateSchemeSubscription({
        schemeData: schemeData,
        user_id: userId,
      });
      const newInstallmentId =
        res?.CreateNewUserScheme?.installmentResult?.firstInstallmentId;
      MarkPaymentStatus(
        newInstallmentId,
        payment.razorpay_order_id,
        payment.razorpay_payment_id,
        "success",
      );
      if (MarkInstallmentStatus(newInstallmentId, new Date(), "paid"))
        logger.info(
          `Installment Updated for Installment_id : ${newInstallmentId}`,
        );
    } else {
      // Paying for existing Installment
      const { installmentId } = req.body;
      console.log("InstlallnemtId : ", installmentId);
      if (MarkInstallmentStatus(installmentId, new Date(), "paid"))
        logger.info(
          `Installment Updated for Installment_id : ${installmentId}`,
        );
    }
    res.status(200).json({ success: true });
  } catch (err) {
    LogError("CreateInstallment", err);
    GenericError(res);
  }
};
