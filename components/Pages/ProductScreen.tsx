import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { AppText, BackendAPI, PriceView, Spinner } from "../common";
import { EvilIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { GetProductDetails } from "../../services/ProductService";
import { getAccessToken } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Toast from "react-native-toast-message";
import { GetCartId } from "../../services/SecureStoreService";
import { AddItemToCart, CreateCart } from "../../services/CartService";

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  description: string;
  price: string;
  weight_grams: string;
  purity: string;
  image: string;
  is_active: number;
  stock_quantity: number;
  created_date: string;
  category_id: number;
}

export default function ProductScreen(data: any) {
  const { productId } = data.route.params;
  const accessToken = getAccessToken();
  const { addToCart } = useCart();
  const showAddedToCartToast = () => {
    Toast.show({
      type: "success",
      text1: `${product?.name} added to Cart ✅`,
      text2: "Go to cart to complete payment",
    });
  };
  const [loading, setLoading] = useState<Boolean>(true);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const Index = async () => {
    const result = await GetProductDetails(productId, accessToken);
    if (result?.data[0]) {
      setProduct(result?.data[0]);
      setLoading(false);
    }
  };
  useEffect(() => {
    Index();
  }, []);

  const HandleAddToCart = async () => {
    // addToCart(product);
    const cartId = await GetCartId();
    if (cartId === null) {
      await CreateCart();
    }
    if (await AddItemToCart(product?.id, 1)) addToCart(product);
    showAddedToCartToast();
  };

  return (
    <View
      className="flex-1
      flex-col justify-between
     "
    >
      {loading ? (
        <Spinner />
      ) : (
        <View>
          <View className="h-[88%]">
            <ScrollView
              showsVerticalScrollIndicator={false}
              className=" p-4 h-[500px]"
            >
              <View className="">
                <AppText className="w-[90%] text-gray-400 text-sm">
                  {product?.sku}
                </AppText>
                <AppText className="text-xl  mb-2 text-[#681016] font-poppins-semibold">
                  {product?.name}
                </AppText>
                <View className="flex-1 items-center">
                  <Image
                    source={{ uri: `${BackendAPI}${product?.image}` }}
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
                      price={parseFloat(product?.price)}
                      className="text-3xl mt-2 text-[#681016] font-poppins-semibold"
                    />
                    <AppText className=" text-xs text-[#681016]">
                      MRP inclusive of all taxes
                    </AppText>
                  </View>
                  <View
                    className={`${product?.stock_quantity > 0 ? "bg-[#74b72e]" : "bg-red-600"} px-4 py-2 h-10 rounded-md`}
                  >
                    <AppText className="text-white font-poppins-bold">
                      {product?.stock_quantity > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </AppText>
                  </View>
                </View>
                <View className="">
                  <View className=" mt-4 rounded-md ">
                    <AppText className=" text-lg font-poppins-bold ">
                      Product Description
                    </AppText>

                    <AppText className=" rounded-md text-sm">
                      {product?.description}
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
                          {product?.purity}
                        </AppText>
                      </View>
                      <View className="w-[50%]">
                        <AppText className=" font-poppins-bold  rounded-md text-base">
                          Metal Weight
                        </AppText>
                        <AppText className="   rounded-md text-base">
                          {product?.weight_grams}
                        </AppText>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <View className="h-[12%] justify-center flex items-center mx-4">
            <TouchableOpacity
              onPress={HandleAddToCart}
              className="bg-[#681016]  p-5 w-full items-center rounded-md flex flex-row justify-center"
            >
              <AppText className="text-center text-white pr-2">
                Add to Cart
              </AppText>
              <EvilIcons name="cart" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
