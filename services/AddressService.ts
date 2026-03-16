import { Address, Addresses } from "../Types/AddressesTypes";
import { LogError, logger } from "../utils/logger";
import { deleteRequest, postRequest } from "./api";
import { GetUserId } from "./SecureStoreService";

export const SaveAddress = async (address: Address): Promise<Boolean> => {
  try {
    const userId = await GetUserId();
    const newAddress = await postRequest<{ success: boolean; error: string }>(
      "/address/addAddress",
      {
        userId: userId,
        name: address.name,
        phone: address.phone,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },
    );
    if (newAddress.success) {
      return newAddress.success;
    } else {
      LogError("SaveAddress : Error in Saving address");
      return newAddress.success;
    }
  } catch (err) {
    LogError("SaveAddress", err);
    return false;
  }
};

export const UpdateAddress = async (address: Address): Promise<Boolean> => {
  try {
    console.log(address);
    const updateAddress = await postRequest<{
      success: boolean;
      error: string;
    }>("/address/updateAddress", {
      id: address.id,
      name: address.name,
      phone: address.phone,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
    if (updateAddress.success) {
      return updateAddress.success;
    } else {
      LogError("UpdateAddress : Error in Updating address");
      return updateAddress.success;
    }
  } catch (err) {
    LogError("UpdateAddress", err);
    return false;
  }
};

export const GetAllAddresses = async (): Promise<Address[] | null> => {
  try {
    const userId = await GetUserId();
    const addresses = await postRequest<{
      success: boolean;
      address: Address[];
      error: string;
    }>("/address/getAllAddress", {
      userId: userId,
    });
    if (addresses.success) {
      return addresses.address;
    } else {
      LogError("GetAllAddresses : Error in Saving address");
      return addresses.address;
    }
  } catch (err) {
    LogError("GetAllAddresses", err);
    return null;
  }
};

export const DeleteAddress = async (
  addressId: string,
): Promise<boolean | null> => {
  try {
    await deleteRequest("/address/deleteAddress", { data: { id: addressId } });
    return true;
  } catch (err) {
    LogError("DeleteAddress", err);
    console.log(err);
    return null;
  }
};
