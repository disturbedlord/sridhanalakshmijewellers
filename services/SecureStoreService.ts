import * as SecureStore from "expo-secure-store";
import { logger } from "../utils/logger";

export const clearSecureStore = async () => {
  try {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("userName");
    await SecureStore.deleteItemAsync("device_id");
    await SecureStore.deleteItemAsync("userMobileNo");
    await SecureStore.deleteItemAsync("userId");
    console.log("SecureStore cleared");
  } catch (error) {
    console.error("Failed to clear SecureStore:", error);
  }
};

export const GetSecureStoreAccessToken = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    console.log("ATTTTTTT  : ", accessToken);
    return accessToken;
  } catch (err) {
    logger.error("GetSecureStoreAccessToken Failed : ", err);
    logger.error("GetSecureStoreAccessToken Failed : ", err);
  }
};

export const GetCartId = async () => {
  try {
    const cartId = await SecureStore.getItemAsync("cartId");
    console.log("cartId  : ", cartId);
    return cartId;
  } catch (err) {
    logger.error("GetCartId Failed : ", err);
  }
};

export const GetUserId = async () => {
  try {
    const userId = await SecureStore.getItemAsync("userId");
    console.log("userId  : ", userId);
    return userId;
  } catch (err) {
    logger.error("GetUserId Failed : ", err);
  }
};

export const SetSecureStoreValue = async (key: string, value: string) => {
  try {
    const setKey = await SecureStore.setItemAsync(key, value);
    logger.debug("SetSecureStoreValue value set for key  : ", key, value);
    return true;
  } catch (err) {
    logger.error("GetUserId Failed : ", err);
    return false;
  }
};
