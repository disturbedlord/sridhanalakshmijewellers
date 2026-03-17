import {
  AddToCart,
  Cart,
  CartResponse,
  ModifyItemInCart,
} from "../Types/CartTypes";
import { LogError } from "../utils/logger";
import { postRequest } from "./api";
import {
  GetCartId,
  GetUserId,
  SetSecureStoreValue,
} from "./SecureStoreService";

export const CreateCart = async (): Promise<Boolean> => {
  try {
    const userId = await GetUserId();
    const cart = await postRequest<CartResponse>("/cart/createCart", {
      userId: userId,
    });
    if (
      cart.success &&
      (await SetSecureStoreValue("cartId", `${cart.result.cartId}:${userId}`))
    ) {
      return true;
    } else {
      LogError("CreateCart : Error in Creating Cart Id");
      return false;
    }
  } catch (err) {
    console.log(err);
    LogError("CreateCart", err);
    return false;
  }
};

export const AddItemToCart = async (
  productId: number,
  qty?: number | undefined,
  deleteItem?: boolean | undefined,
): Promise<Boolean> => {
  try {
    const cartId = await GetCartId();
    console.log(cartId, productId, qty, deleteItem);
    const cart = await postRequest<ModifyItemInCart>("/cart/modifyItemInCart", {
      cartId: cartId,
      productId: productId,
      qty: qty,
      deleteItem: deleteItem,
    });

    if (cart.success) {
      return true;
    } else {
      LogError("AddItemToCart : Error in Creating Cart Id");
      return false;
    }
  } catch (err) {
    LogError("AddItemToCart", err);
    return false;
  }
};

export const GetCart = async (): Promise<Cart | null> => {
  try {
    const cartId = await GetCartId();
    console.log(cartId, "CCCCCCCCCCCCC");
    if (!cartId) return null;
    const cart = await postRequest<Cart>("/cart/getCart", {
      cartId: cartId,
    });

    if (cart.success) {
      return cart;
    } else {
      LogError("GetCart : Error in Creating Cart Id ", cart.error);
      return null;
    }
  } catch (err) {
    LogError("GetCart", err);
    return null;
  }
};
