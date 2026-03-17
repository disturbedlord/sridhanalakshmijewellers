import { LogError } from "../utils/logger";
import { postRequest } from "./api";
import { GetUserId } from "./SecureStoreService";

export const CreateNewOrder = async (
  amount: string,
): Promise<string | null> => {
  try {
    const userId = await GetUserId();
    const newOrder = await postRequest<{
      success: boolean;
      orderId: string;
      error: string;
    }>("/orders/createNewOrder", {
      userId: userId,
      totalAmount: amount,
    });

    if (newOrder.success) {
      return newOrder.orderId;
    } else {
      LogError("CreateNewOrder : Error in Creating new Order ", newOrder.error);
      return null;
    }
    return null;
  } catch (err) {
    LogError("CreateNewOrder", err);
    return null;
  }
};

export const UpdateOrderStatus = async (
  orderId: string,
  status: string,
): Promise<boolean | null> => {
  try {
    const updateOrder = await postRequest<{
      success: boolean;
      error: string;
    }>("/orders/updateOrderStatus", {
      orderId: orderId,
      status: status,
    });

    if (updateOrder.success) {
      return updateOrder.success;
    } else {
      LogError(
        "CreateNewOrder : Error in Creating new Order ",
        updateOrder.error,
      );
      return false;
    }
  } catch (err) {
    LogError("CreateNewOrder", err);
    return null;
  }
};

export const AddItemsToOrder = async (
  orderId: string,
  orderItems: { productId: string; quantity: string; price: string }[],
): Promise<boolean | null> => {
  try {
    const updateOrder = await postRequest<{
      success: boolean;
      error: string;
    }>("/orders/updateOrderStatus", {
      orderId: orderId,
      orderItems: orderItems,
    });

    if (updateOrder.success) {
      return updateOrder.success;
    } else {
      LogError(
        "CreateNewOrder : Error in Creating new Order ",
        updateOrder.error,
      );
      return false;
    }
  } catch (err) {
    LogError("CreateNewOrder", err);
    return null;
  }
};
