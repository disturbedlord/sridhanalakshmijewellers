import { Image, ScrollView, View } from "react-native";
import { AppText, BackendAPI, PriceView } from "../common";
import { Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CartScreen({ navigation }: any) {
  return (
    <View className="p-4 flex-1">
      <ScrollView className="flex-1">
        <View>
          <AppText className="text-2xl font-poppins-bold">Cart</AppText>
        </View>
        <View className="flex-1 my-2 flex-row ">
          <View className="w-[50%]">
            <Image
              source={{
                uri: `${BackendAPI}/assets/images/products/necklace.webp`,
              }}
              className="w-[90%] px-10 rounded-lg"
              style={{ aspectRatio: 1 }}
              resizeMode="cover"
            />
          </View>
          <View className="w-[50%] flex flex-col justify-between">
            <View>
              <AppText className="font-poppins-semibold text-base">
                Silver Lotus Necklace
              </AppText>
              <PriceView
                price={4321.23}
                className="font-poppins-semibold text-base"
              />
            </View>

            <View className="flex flex-row justify-between items-center">
              <Counter />
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-1 my-2 flex-row ">
          <View className="w-[50%]">
            <Image
              source={{
                uri: `${BackendAPI}/assets/images/products/ring.webp`,
              }}
              className="w-[90%] px-10 rounded-lg"
              style={{ aspectRatio: 1 }}
              resizeMode="cover"
            />
          </View>
          <View className="w-[50%] flex flex-col justify-between">
            <View>
              <AppText className="font-poppins-semibold text-base">
                Silver Solitaire Ring{" "}
              </AppText>
              <PriceView
                price={514.23}
                className="font-poppins-semibold text-base"
              />
            </View>

            <View className="flex flex-row justify-between items-center">
              <Counter />
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export function Counter() {
  const [count, setCount] = useState(1);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => {
    if (count > 1) setCount((c) => c - 1);
  };

  return (
    <View className="flex-row items-center border border-neutral-300 rounded-lg overflow-hidden">
      <TouchableOpacity
        onPress={decrement}
        className="px-4 py-1 bg-neutral-100"
      >
        <Text className="text-lg font-semibold">-</Text>
      </TouchableOpacity>

      <View className="px-3 py-1">
        <Text className="text-base font-semibold">{count}</Text>
      </View>

      <TouchableOpacity
        onPress={increment}
        className="px-4 py-1 bg-neutral-100"
      >
        <Text className="text-lg font-semibold">+</Text>
      </TouchableOpacity>
    </View>
  );
}
