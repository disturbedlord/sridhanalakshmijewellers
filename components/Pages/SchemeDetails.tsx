import { RouteProp } from "@react-navigation/native";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "./SchemeScreen";
import { AppText } from "../common";

type SchemeDetailsRouteProp = RouteProp<RootStackParamList, "SchemeDetails">;

type Props = { route: SchemeDetailsRouteProp };

export default function SchemeDetails({ route }: Props) {
  const { scheme } = route.params;
  console.log(scheme);
  return (
    <View className="p-4 flex gap-2">
      <AppText className="font-poppins-bold text-xl">Scheme Details</AppText>
      <View className="border-b-4 rounded-xl mt-1 mb-2 border-b-orange-400 w-44 h-0"></View>

      <View className="  bg-transparent rounded-2xl flex items-center justify-center ">
        <ImageBackground
          source={scheme.img}
          resizeMode="cover"
          className="w-full h-40 rounded-2xl overflow-hidden shadow-lg bg-white"
        >
          <View className="flex-1 justify-end p-4"></View>
        </ImageBackground>
      </View>

      <View className="flex flex-row">
        <AppText className="font-poppins-semibold text-lg">Name : </AppText>
        <AppText className="text-lg">{scheme.name}</AppText>
      </View>
      <View className="flex flex-row">
        <AppText className="font-poppins-semibold text-lg">
          No. of Months :{" "}
        </AppText>
        <AppText className="text-lg">{scheme.units}</AppText>
      </View>
      <View className="flex flex-row">
        <AppText className="font-poppins-semibold text-lg">
          Per Month Contribution :{" "}
        </AppText>
        <AppText className="text-lg">₹{scheme.price_per_unit}</AppText>
      </View>
      <View>
        <View className="flex flex-row">
          <AppText className="font-poppins-semibold text-lg">
            DLJS Contribution :{" "}
          </AppText>
          <AppText className="text-lg">₹{scheme.company_contribution}</AppText>
        </View>
        <AppText className="text-base">
          (+1 month premium as gift at the end of the scheme)
        </AppText>
      </View>

      <View className="flex flex-row">
        <AppText className="font-poppins-semibold text-lg">
          Total Amount :{" "}
        </AppText>
        <AppText className="text-lg">₹{scheme.total_amount}</AppText>
      </View>

      <TouchableOpacity className="p-4 mt-10 bg-blue-500 flex items-center rounded-md shadow">
        <AppText className="font-poppins-semibold text-lg text-white">
          Pay ₹{scheme.price_per_unit}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
