import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Application from "expo-application";

import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";

const DEVICE_ID_KEY = "device_id";

export async function getOrCreateDeviceId(): Promise<string> {
  let deviceId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
  console.log("DDDD : ", deviceId);
  if (!deviceId) {
    deviceId = uuidv4();
    await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
  }

  return deviceId;
}

export async function getDeviceInfo() {
  const deviceId = await getOrCreateDeviceId();
  logger.debug("HEHEHEHE : " + deviceId);
  return {
    deviceId,
    device_name: `${Device.manufacturer} ${Device.modelName}`,
    platform: Platform.OS,
    app_version: Application.nativeApplicationVersion,
    build_number: Application.nativeBuildVersion,
  };
}
