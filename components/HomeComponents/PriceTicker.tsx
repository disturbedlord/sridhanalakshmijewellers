import { useCallback, useEffect, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { AppText, Img } from "../common";
import Svg, { Path } from "react-native-svg";
import goldCoin from "../../assets/images/goldcoin.jpeg";
import silverCoin from "../../assets/images/silvercoin.jpeg";
import React, { memo } from "react";
import { GetLatestPrice } from "../../services/DashboardService";
import { getAccessToken } from "../../context/AuthContext";
const options = [
  { name: "GOLD 24 KT/1g", technicalName: "gold24k", img: goldCoin },
  { name: "GOLD 22 KT/1g", technicalName: "gold22k", img: goldCoin },
  { name: "GOLD 18 KT/1g", technicalName: "gold18k", img: goldCoin },
  { name: "SILVER 1g", technicalName: "silver", img: silverCoin },
];

export default function PriceTicker() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options.at(0));

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
    // console.log("clicked");
  }, []);

  const userAccessToken = getAccessToken();
  const [metalPrice, setMetalPrice] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const getLatestMetalPrice = async () => {
    setLoading(true);
    const price = await GetLatestPrice(userAccessToken);
    if (price?.latestPrice) {
      console.log("LOG : ", price.latestPrice[0]);
      setMetalPrice(price.latestPrice[0]);
      setLoading(false);
    }
  };
  useEffect(() => {
    getLatestMetalPrice();
    console.log(metalPrice);
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
            {loading &&
            metalPrice &&
            metalPrice[selected?.technicalName] !== undefined
              ? "Loading ..."
              : `${selected?.name} - ₹${metalPrice && metalPrice[selected?.technicalName]}`}
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
      {open && metalPrice && <DropdownItems price={metalPrice} />}
    </View>
  );
}

const DropdownItems = memo((params) => {
  return (
    <View className="absolute top-10 w-full bg-white rounded-lg shadow-lg py-2 z-50">
      {options.map((item, index) => {
        return (
          <View key={index} className={`px-3 py-2 flex-row gap-2 items-center`}>
            <Img src={item.img} className="w-[20px] h-[20px]" />
            <AppText
              className={`text-[#681016]`}
            >{`${item.name} -    ₹${params.price[item.technicalName]}`}</AppText>
          </View>
        );
      })}
    </View>
  );
});
