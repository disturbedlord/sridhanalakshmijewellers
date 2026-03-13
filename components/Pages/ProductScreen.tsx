import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { AppText, BackendAPI, PriceView } from "../common";
import { EvilIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function ProductScreen(data: any) {
  const { product } = data.route.params;

  return (
    <View
      className="flex-1
      flex-col justify-between
     "
    >
      <View className="h-[88%]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className=" p-4 h-[500px]"
        >
          <View className="">
            <AppText className="w-[90%] text-gray-400 text-sm">
              {product.sku}
            </AppText>
            <AppText className="text-xl  mb-2 text-[#681016] font-poppins-semibold">
              {product.name}
            </AppText>
            <View className="flex-1 items-center">
              <Image
                source={{ uri: `${BackendAPI}${product.image}` }}
                className="w-full rounded-lg"
                style={{ aspectRatio: 1 }}
                resizeMode="cover"
              />
            </View>
          </View>
          <View className="flex-1 mb-5">
            <View className=" flex flex-row justify-between items-center">
              <View>
                <PriceView
                  price={product.price}
                  className="text-3xl mt-2 text-[#681016] font-poppins-semibold"
                />
                <AppText className=" text-xs text-[#681016]">
                  MRP inclusive of all taxes
                </AppText>
              </View>
              <View className="bg-[#74b72e] px-4 py-2 h-10 rounded-md">
                <AppText className="text-white font-poppins-bold">
                  In-Stock
                </AppText>
              </View>
            </View>
            <View className="">
              <View className=" mt-4 rounded-md ">
                <AppText className=" text-lg font-poppins-bold ">
                  Product Description
                </AppText>

                <AppText className=" rounded-md text-base ">
                  Introducing our exquisite Silver Ghungroo Anklet, a timeless
                  piece crafted from premium 925 Sterling Silver that embodies
                  the essence of traditional Indian artistry. Each delicate
                  ghungroo is meticulously arranged and hand-finished to create
                  a harmonious melody of elegance, perfect for festivals,
                  weddings, and everyday celebrations. This authentic sterling
                  silver creation is an ideal companion for cultural occasions,
                  festive gatherings, or adding a touch of graceful charm to
                  your everyday ensemble.
                </AppText>
              </View>
              <View className=" mt-4 rounded-md ">
                <AppText className=" text-lg  pb-2 font-poppins-bold ">
                  Product Details
                </AppText>
                <View className=" flex flex-row bg-gray-200 p-4 rounded-md">
                  <View className="w-[50%]">
                    <AppText className=" font-poppins-bold  rounded-md text-base">
                      Metal Purity
                    </AppText>
                    <AppText className="  rounded-md text-base">
                      925 Sterling Silver
                    </AppText>
                  </View>
                  <View className="w-[50%]">
                    <AppText className=" font-poppins-bold  rounded-md text-base">
                      Metal Weight
                    </AppText>
                    <AppText className="   rounded-md text-base">25.47</AppText>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View className="h-[12%] justify-center flex items-center mx-4">
        <TouchableOpacity className="bg-[#681016]  p-5 w-full items-center rounded-md flex flex-row justify-center">
          <AppText className="text-center text-white pr-2">Add to Cart</AppText>
          <EvilIcons name="cart" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
