import * as SecureStore from "expo-secure-store";

export const clearSecureStore = async () => {
  try {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    await SecureStore.deleteItemAsync("userName");
    await SecureStore.deleteItemAsync("device_id");
    await SecureStore.deleteItemAsync("userMobileNo");
    console.log("SecureStore cleared");
  } catch (error) {
    console.error("Failed to clear SecureStore:", error);
  }
};
