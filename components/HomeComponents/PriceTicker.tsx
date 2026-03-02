import { useCallback, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { AppText, Img } from "../common";
import Svg, { Path } from "react-native-svg";
import goldCoin from "../../assets/images/goldcoin.jpeg";
import React, { memo } from "react";
const options = [
  "GOLD 24 KT/1g - ₹16,600",
  "GOLD 22 KT/1g - ₹15,210",
  "GOLD 18 KT/1g - ₹13,020",
  "SILVER 1g - ₹296",
];

export default function PriceTicker() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
    console.log("clicked");
  }, []);

  return (
    <View className="relative">
      {/* Trigger */}
      <TouchableOpacity
        onPress={toggleOpen}
        className="px-4 py-1 text-gray-800 font-semibold rounded-md"
      >
        <View className="flex flex-row items-center gap-2 text-[#681016] bg-[#FEF7F7] ">
          <Img src={goldCoin} className="w-[20px] h-[20px]" />
          <AppText className="text-[#681016] font-medium font-poppins ">
            {selected}
          </AppText>
          <View style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}>
            <Svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <Path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </View>
      </TouchableOpacity>

      {/* Dropdown */}
      {open && <DropdownItems />}
    </View>
  );
}

const DropdownItems = memo(() => {
  return (
    <View className="absolute top-10 w-full bg-white rounded-lg shadow-lg py-2 z-50">
      {options.map((item, index) => {
        return (
          <View key={index} className={`px-3 py-2 flex-row gap-2 items-center`}>
            <Img src={goldCoin} className="w-[20px] h-[20px]" />
            <AppText className={`text-[#681016]`}>{item}</AppText>
          </View>
        );
      })}
    </View>
  );
});
