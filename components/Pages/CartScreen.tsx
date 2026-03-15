import { Image, ScrollView, View } from "react-native";
import { AppText, BackendAPI, PriceView, Spinner } from "../common";
import { Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { Product } from "./ProductScreen";
import { logger } from "../../utils/logger";

type Invoice = { subTotal: Number; shipping: Number; total: Number };

export default function CartScreen({ navigation }: any) {
  const { cart } = useCart();
  // console.log("Cart : ", cart);
  const [loading, setLoading] = useState<Boolean>(true);
  const [invoice, setInvoice] = useState<Invoice>({
    subTotal: 0,
    shipping: 0,
    total: 0,
  });
  const calculatePrice = async () => {
    setLoading(true);

    let subTotal = 0;

    cart.forEach((item: Product) => {
      subTotal += parseFloat(item.price) * item.qty;
    });

    const invoiceData: Invoice = {
      subTotal: subTotal,
      shipping: cart.length > 0 ? 550 : 0,
      total: subTotal + (cart.length > 0 ? 550 : 0),
    };

    setInvoice(invoiceData);

    // small delay makes UI transition smoother
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  useEffect(() => {
    calculatePrice();
    console.log(cart, 123);
  }, [cart]);

  const HandleCheckout = () => {
    // navigation.navigate("CheckoutScreen" , {cart})
  };

  return (
    <View className=" flex-1">
      {loading ? (
        <Spinner text="Refreshing Cart" />
      ) : (
        <View className=" flex-1">
          <View className="h-[70%]">
            <ScrollView className="p-4 flex-1 h-[70%]">
              <View>
                <AppText className="text-2xl font-poppins-bold">
                  Cart({cart.length})
                </AppText>
              </View>
              <View className="mb-4">
                {cart.length > 0 ? (
                  cart.map((item, idx) => (
                    <View key={item.id} className="">
                      <CartItem item={item} />
                      {idx !== cart.length - 1 && (
                        <View className="h-px bg-gray-200 my-0.5" />
                      )}
                    </View>
                  ))
                ) : (
                  <View>
                    <AppText className="text-center">No Items in Cart</AppText>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          <View className="h-[30%] mt-5 flex-1 bg-white p-4 rounded-lg">
            <View className="flex flex-row justify-between">
              <AppText className="font-poppins-semibold">Sub Total</AppText>
              <PriceView price={invoice.subTotal} className="" />
            </View>
            <View className="flex flex-row justify-between">
              <AppText className="font-poppins-semibold">Shipping</AppText>
              <PriceView price={invoice.shipping} className="" />
            </View>
            <View className="flex flex-row justify-between">
              <AppText className="font-poppins-semibold">Total</AppText>
              <PriceView price={invoice.total} className="" />
            </View>
            <TouchableOpacity
              onPress={HandleCheckout}
              className="my-5 bg-blue-700 p-4 rounded-md"
            >
              <AppText className="text-center font-poppins-bold text-white">
                Checkout
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const CartItem = ({ item }: { item: Product }) => {
  const { deleteFromCart } = useCart();
  console.log("Creating CartItems : ", item.id);
  return (
    <View className="flex-1 my-2 flex-row ">
      <View className="w-[50%]">
        <Image
          source={{
            uri: `${BackendAPI}${item.image}`,
          }}
          className="w-[80%] px-10 rounded-lg"
          style={{ aspectRatio: 1 }}
          resizeMode="cover"
        />
      </View>
      <View className="w-[50%] flex flex-col justify-evenly">
        <View>
          <AppText className="font-poppins-semibold text-base">
            {item.name}
          </AppText>
          <PriceView
            price={parseFloat(item.price)}
            className="font-poppins-semibold text-base"
          />
        </View>

        <View className="flex flex-row justify-between items-center">
          <Counter product={item} />
          <TouchableOpacity onPress={() => deleteFromCart(item.id)}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function Counter({ product }: { product: Product }) {
  const { addToCart, removeFromCart } = useCart();

  const increment = () => {
    addToCart(product);
  };

  const decrement = () => {
    removeFromCart(product.id);
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
        <Text className="text-base font-semibold">{product.qty}</Text>
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
