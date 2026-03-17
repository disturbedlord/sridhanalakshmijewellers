import { Image, ScrollView, View } from "react-native";
import { AppText, BackendAPI, PriceView, Spinner } from "../common";
import { Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { Product } from "./ProductScreen";
import { logger } from "../../utils/logger";
import { AddItemToCart, GetCart } from "../../services/CartService";
import { CartItem } from "../../Types/CartTypes";

type Invoice = { subTotal: number; shipping: number; total: number };

export default function CartScreen({ navigation }: any) {
  // console.log("Cart : ", cart);
  const { cart } = useCart();
  const [loading, setLoading] = useState<Boolean>(true);
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [invoice, setInvoice] = useState<Invoice>({
    subTotal: 0,
    shipping: 0,
    total: 0,
  });

  const calculatePrice = async () => {
    setLoading(true);

    let subTotal = 0;

    cart?.forEach((item: CartItem) => {
      subTotal += parseFloat(item.price) * item.quantity;
    });

    const invoiceData: Invoice = {
      subTotal: subTotal,
      shipping: cart?.length > 0 ? 550 : 0,
      total: subTotal + (cart?.length > 0 ? 550 : 0),
    };

    setInvoice(invoiceData);

    // small delay makes UI transition smoother
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const Index = async () => {
    setLoading(true);
    try {
      const cartData = await GetCart();
      if (cartData?.success) {
        setCarts(cartData.items);
      }
    } catch (err) {
      logger.debug("Cart Screen Error : ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Index();
    calculatePrice();
    console.log(cart, 123);
  }, [cart]);

  const HandleCheckout = () => {
    navigation.navigate("CheckoutScreen");
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
                  Cart({cart?.length ?? 0})
                </AppText>
              </View>
              <View className="mb-4">
                {cart?.length > 0 ? (
                  cart?.map((item, idx) => (
                    <View key={item.product_id} className="">
                      <CartItemComponent item={item} />
                      {idx !== cart?.length - 1 && (
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
              <PriceView price={invoice?.subTotal} className="" />
            </View>
            <View className="flex flex-row justify-between">
              <AppText className="font-poppins-semibold">Shipping</AppText>
              <PriceView price={invoice?.shipping} className="" />
            </View>
            <View className="flex flex-row justify-between">
              <AppText className="font-poppins-semibold">Total</AppText>
              <PriceView price={invoice?.total} className="" />
            </View>
            <TouchableOpacity
              onPress={HandleCheckout}
              className={`my-5 ${invoice.total > 0 ? "bg-blue-500" : "bg-gray-500"} p-4 rounded-md`}
              disabled={invoice.total > 0 ? false : true}
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

const CartItemComponent = ({ item }: { item: CartItem }) => {
  const { deleteFromCart } = useCart();
  // console.log("Creating CartItems : ", item.id);
  const HandleDeleteItem = async () => {
    const deleteItem = await AddItemToCart(item.product_id, undefined, true);
    if (deleteItem) deleteFromCart(item.product_id);
  };
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
          <TouchableOpacity onPress={HandleDeleteItem}>
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

function Counter({ product }: { product: CartItem }) {
  const { addToCart, removeFromCart } = useCart();

  const increment = async () => {
    const itemAdded = await AddItemToCart(product.product_id, 1);
    if (itemAdded) {
      addToCart(product);
    }
  };

  const decrement = async () => {
    const itemRemoved = await AddItemToCart(product.product_id, -1);
    if (itemRemoved) removeFromCart(product.product_id);
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
        <Text className="text-base font-semibold">{product.quantity}</Text>
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
