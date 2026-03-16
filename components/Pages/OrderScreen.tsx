import { View } from "react-native";
import { AppText } from "../common";
import { Feather } from "@expo/vector-icons";

export default function OrderScreen(params) {
  const { city, line1, line2, name, phone, state, pincode } =
    params.route.params?.address;
  return (
    <View className="flex-1 p-10 justify-center items-center gap-2">
      <View className="bg-green-600 rounded-full p-5 mb-5">
        <Feather name="check" size={80} color="white" />
      </View>
      <AppText className="text-xl text-black font-poppins-semibold">
        Order Placed Successfully 🎉
      </AppText>
      <AppText className="text-sm text-center">
        Your order{" "}
        <AppText className="font-poppins-semibold">#ORD12345</AppText> has been
        placed successfully.
      </AppText>
      <View className="pt-5 first:">
        <AppText className="font-poppins-semibold">Delivery Address :</AppText>
        <AppText className="text-sm">
          {`${name},${line1},${line2},${city},${state},${pincode}`}
        </AppText>
        <AppText className="text-sm py-2">Mobile No: {phone}</AppText>
      </View>

      <View className="w-full flex flex-row justify-start">
        <AppText className="text-left font-poppins-semibold">
          Expected Delivery : <AppText>3 - 5 days</AppText>
        </AppText>
      </View>
    </View>
  );
}
