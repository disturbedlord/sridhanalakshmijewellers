import { RouteProp } from "@react-navigation/native";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "./SchemeScreen";
import { AppText, height } from "../common";
import { RazorpayResult, startPayment } from "../../services/RazorpayService";
import { useRef, useState } from "react";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { getAccessToken, getUserId } from "../../context/AuthContext";

type SchemeDetailsRouteProp = RouteProp<RootStackParamList, "SchemeDetails">;

type Props = { route: SchemeDetailsRouteProp };

export default function SchemeDetails({ route }: Props) {
  const { scheme } = route.params;
  const userId = getUserId();
  const userAccessToken = getAccessToken();
  const [paymentData, setPaymentData] = useState<RazorpayResult | undefined>(
    undefined,
  );
  const payButtonPresses = useRef(false);
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const HandlePayment = async () => {
    if (payButtonPresses.current) return;
    payButtonPresses.current = true;

    const payment = await startPayment(
      scheme,
      userId,
      true,
      undefined,
      userAccessToken,
    );

    setPaymentData(payment);
    setPopupOpen(true);
    payButtonPresses.current = false;
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  // console.log("Screen Heioght : ", Number.parseInt(String(height)));
  return (
    <ScrollView className="flex-1 flex-grow">
      <View className="min-h-screen flex-1 ">
        <View
          className="p-4 flex-1 relative gap-2 h-full bg-white"
          style={styles.background}
        >
          <AppText className="font-poppins-bold text-xl">
            Scheme Details
          </AppText>
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
            <AppText className="text-lg">{scheme.planLength}</AppText>
          </View>
          <View className="flex flex-row">
            <AppText className="font-poppins-semibold text-lg">
              Per Month Contribution :{" "}
            </AppText>
            <AppText className="text-lg">₹ {scheme.price_per_month}</AppText>
          </View>
          <View>
            <View className="flex flex-row">
              <AppText className="font-poppins-semibold text-lg">
                DLJS Contribution :{" "}
              </AppText>
              <AppText className="text-lg">
                ₹ {scheme.company_contribution}
              </AppText>
            </View>
            <AppText className="text-base">
              (+1 month premium as gift at the end of the scheme)
            </AppText>
          </View>

          <View className="flex flex-row">
            <AppText className="font-poppins-semibold text-lg">
              Total Amount :{" "}
            </AppText>
            <AppText className="text-lg">₹ {scheme.total_amount}</AppText>
          </View>
          <View className="mt-10 flex">
            <AppText className="mb-1 text-center text-gray-500 text-sm font-poppins-semibold">
              Start saving by applying below ⬇️
            </AppText>

            <TouchableOpacity
              onPress={HandlePayment}
              className="p-4  bg-blue-500 flex items-center rounded-md shadow"
            >
              <AppText className="font-poppins-semibold text-lg text-white">
                Pay ₹ {scheme.price_per_month}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        {popupOpen && (
          <View
            style={styles.overlay}
            className={`absolute flex-1  items-center justify-center bg-black/80 w-full h-[${Number.parseInt(String(height))}px ]`}
          >
            <View className="bg-white gap-5 p-10 flex items-center rounded-lg">
              <TouchableOpacity
                onPress={closePopup}
                className="absolute right-0 p-2"
              >
                <AntDesign name="close" size={20} color="black" />
              </TouchableOpacity>
              {paymentData?.status === 1 ? (
                <PaymentSuccess
                  message={paymentData?.orderResponse?.razorpay_order_id}
                />
              ) : (
                <PaymentFailure
                  message={paymentData?.orderResponse?.error?.reason}
                />
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export const PaymentSuccess = (message: any) => {
  return (
    <>
      <Ionicons name="checkmark-circle-sharp" size={100} color="green" />
      <View>
        <AppText className="text-center text-lg font-poppins-semibold">
          Payment Success 🎉
        </AppText>
        <AppText className="text-sm wrap">Trans : {message.message}</AppText>
      </View>
    </>
  );
};

export const PaymentFailure = (message: any) => {
  return (
    <>
      <Entypo name="circle-with-cross" size={100} color="red" />
      <View>
        <AppText className="text-center  text-lg font-poppins-semibold">
          Payment Failed{" "}
        </AppText>
        <AppText className="text-sm">Reason : {message.message}</AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {},
  overlay: {
    position: "absolute", // important!
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)", // semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // ensures it's on top
  },
});
