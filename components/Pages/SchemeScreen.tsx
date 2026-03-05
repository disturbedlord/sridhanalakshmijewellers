import {
  Image,
  ImageBackground,
  Module,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText, Img, width } from "../common";
import React, { useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { HomeScreenNavigationProp } from "../../App";
import { schemeData } from "../SchemeComponents/SchemeData";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  SchemeList: undefined;
  SchemeDetails: { scheme: Scheme }; // 'scheme' is the key expected
};

export type Scheme = {
  scheme_id: number;
  name: string;
  price_per_unit: number;
  units: number;
  gift: string;
  total_amount: number;
  company_contribution: number;
  created_at: string;
  img: any;
};

type SchemeListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SchemeList"
>;

export default function SchemeScreen() {
  const navigation = useNavigation<SchemeListNavigationProp>();
  const [mySchemes, setMySchemes] = useState(undefined);
  return (
    <View className=" bg-gray-100 py-4">
      <View className="px-4 flex  mb-2">
        <AppText className="text-xl font-poppins-bold text-gray-800 mt-2">
          Saving Schemes
        </AppText>

        <View className="border-b-4 rounded-xl mt-1 mb-2 border-b-orange-400 w-44 h-0"></View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=""
      >
        <View className="flex-row gap-4 px-10">
          {schemeData.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => navigation.push("SchemeDetails", { scheme: item })}
            >
              <SchemeCard img={item.img} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="px-4 my-4">
        <AppText className="font-poppins-bold text-xl">
          My Saving Schemes
        </AppText>
        <View className="border-b-4 rounded-xl mt-1 mb-2 border-b-orange-400 w-52 h-0"></View>
        <View>
          {!mySchemes ? (
            <View className="flex items-center  h-24 justify-center">
              <AppText>Nothing to Show</AppText>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const SchemeCard = ({ key, img }: any) => {
  return (
    <View className="  bg-transparent rounded-2xl flex items-center justify-center ">
      <ImageBackground
        source={img}
        resizeMode="cover"
        className="w-72 h-40 rounded-2xl overflow-hidden shadow-lg bg-white"
      >
        <View className="flex-1 justify-end p-4"></View>
      </ImageBackground>
    </View>
  );
};

{
  /* <View className="flex-1">
        <View className="flex-1 p-4 bg-white ">
          <View className="flex items-center mb-2">
            <AppText className="text-orange-500 tracking-widest text-sm">
              Savings
            </AppText>

            <AppText className="text-3xl font-poppins-bold text-gray-800 mt-2">
              Schemes
            </AppText>

            <AppText className="text-gray-500 text-center mt-3">
              Invest in our saving schemes to get maximum benefit and a assured
              gift
            </AppText>
            <View className="border-b-4 rounded-xl my-4 border-b-orange-400 w-20 h-0"></View>
          </View>
          {/* Pricing Table */
}
// <View className="bg-blue-300 p-3 rounded-lg mb-1">
//   <Text className="text-white text-lg font-semibold">
//     500 x 11 = 5500 + 500 = 6000 + GIFT
//   </Text>
// </View>
// <View className="bg-blue-400 p-3 rounded-lg mb-1">
//   <Text className="text-white text-lg font-semibold">
//     1000 x 11 = 11000 + 1000 = 12000 + GIFT
//   </Text>
// </View>
// <View className="bg-orange-500 p-3 rounded-lg mb-1">
//   <Text className="text-white text-lg font-semibold">
//     1500 x 11 = 16500 + 1500 = 18000 + GIFT
//   </Text>
// </View>
// <View className="bg-yellow-400 p-3 rounded-lg mb-1">
//   <Text className="text-white text-lg font-semibold">
//     2000 x 11 = 22000 + 2000 = 24000 + GIFT
//   </Text>
// </View>
// <View className="bg-yellow-500 p-3 rounded-lg mb-1">
//   <Text className="text-white text-lg font-semibold">
//     2500 x 11 = 27500 + 2500 = 30000 + GIFT
//   </Text>
// </View>
// <View className="bg-green-500 p-3 rounded-lg mb-1">
//   <Text className="text-white text-lg font-semibold">
//     5000 x 11 = 55000 + 5000 = 60000 + GIFT
//   </Text>
// </View>
// <View className="bg-red-500 p-3 rounded-lg mb-1">
//   <Text className="text-white text-lg font-semibold">
//     10000 x 11 = 110000 + 10000 = 120000 + GIFT
//   </Text>
// </View>
//     {/* Footer Message
// <View className="bg-blue-600 p-4 rounded-lg">
//   <Text className="text-white text-center text-lg">
//     எங்கள் இடம் 916 KDM தங்க நகைகள் ஆட்டரின் பேரில் தரமான சேவை தரப்படும்
//   </Text>
// </View> */}
//     <View className="flex items-center py-5 gap-2">
//       <AppText className="font-poppins-bold text-base">
//         Interested ? Login to Apply
//       </AppText>
//       <TouchableOpacity
//         onPress={() => navigation.navigate("Auth")}
//         className="w-full bg-[#D4AF37] py-4 rounded-xl shadow-md active:opacity-80"
//       >
//         <AppText className="text-center text-white font-poppins-semibold text-lg">
//           Login
//         </AppText>
//       </TouchableOpacity>
//     </View>
//   </View>
// </View> */}
