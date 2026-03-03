import { TouchableOpacity, View } from "react-native";
import { AppText } from "../common";
import React from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { HomeScreenNavigationProp } from "../../App";

type DashboardProps = {
  navigation: HomeScreenNavigationProp;
};

export default function SchemeScreen({ navigation }: DashboardProps) {
  return (
    <View className="flex-1">
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
        {/* Pricing Table */}
        <View className="bg-blue-300 p-3 rounded-lg mb-1">
          <Text className="text-white text-lg font-semibold">
            500 x 11 = 5500 + 500 = 6000 + GIFT
          </Text>
        </View>
        <View className="bg-blue-400 p-3 rounded-lg mb-1">
          <Text className="text-white text-lg font-semibold">
            1000 x 11 = 11000 + 1000 = 12000 + GIFT
          </Text>
        </View>
        <View className="bg-orange-500 p-3 rounded-lg mb-1">
          <Text className="text-white text-lg font-semibold">
            1500 x 11 = 16500 + 1500 = 18000 + GIFT
          </Text>
        </View>
        <View className="bg-yellow-400 p-3 rounded-lg mb-1">
          <Text className="text-white text-lg font-semibold">
            2000 x 11 = 22000 + 2000 = 24000 + GIFT
          </Text>
        </View>
        <View className="bg-yellow-500 p-3 rounded-lg mb-1">
          <Text className="text-white text-lg font-semibold">
            2500 x 11 = 27500 + 2500 = 30000 + GIFT
          </Text>
        </View>
        <View className="bg-green-500 p-3 rounded-lg mb-1">
          <Text className="text-white text-lg font-semibold">
            5000 x 11 = 55000 + 5000 = 60000 + GIFT
          </Text>
        </View>
        <View className="bg-red-500 p-3 rounded-lg mb-1">
          <Text className="text-white text-lg font-semibold">
            10000 x 11 = 110000 + 10000 = 120000 + GIFT
          </Text>
        </View>
        {/* Footer Message
      <View className="bg-blue-600 p-4 rounded-lg">
        <Text className="text-white text-center text-lg">
          எங்கள் இடம் 916 KDM தங்க நகைகள் ஆட்டரின் பேரில் தரமான சேவை தரப்படும்
        </Text>
      </View> */}
        <View className="flex items-center py-5 gap-2">
          <AppText className="font-poppins-bold text-base">
            Interested ? Login to Apply
          </AppText>
          <TouchableOpacity
            onPress={() => navigation.navigate("Auth")}
            className="w-full bg-[#D4AF37] py-4 rounded-xl shadow-md active:opacity-80"
          >
            <AppText className="text-center text-white font-poppins-semibold text-lg">
              Login
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
