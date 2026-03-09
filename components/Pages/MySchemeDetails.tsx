import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText, height, Loader } from "../common";
import { MySchemeType } from "./SchemeScreen";
import { useEffect, useRef, useState } from "react";
import { GetAllInstallments } from "../../services/SchemeService";
import { getAccessToken, getUserId } from "../../context/AuthContext";
import { RazorpayResult, startPayment } from "../../services/RazorpayService";
import {
  getSchemeData,
  schemeData,
  SchemeType,
} from "../SchemeComponents/SchemeData";
import { PaymentFailure, PaymentSuccess } from "./SchemeDetails";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MySchemeDetails(data: any) {
  const [installments, setInstallments] = useState(undefined);
  const [isAct, setIsAct] = useState(true);
  const [newSchemeData, setNewSchemeData] = useState(data.route?.params?.entry);
  const [loading, setLoading] = useState(true);
  const userId = getUserId();
  const accessToken = getAccessToken();
  // let schemeDetails = data.route?.params?.entry;
  //   console.log(schemeDetails);
  const [nextDue, setNextDue] = useState(undefined);
  const payButtonPressed = useRef(false);
  const [paymentData, setPaymentData] = useState<RazorpayResult | undefined>(
    undefined,
  );
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [dataChanged, setDataChanged] = useState(false);
  const handleInstallmentPayment = async () => {
    if (payButtonPressed.current) return;
    payButtonPressed.current = true;
    const schemeData = getSchemeData(newSchemeData.schemeId);
    const payment = await startPayment(
      schemeData,
      userId,
      false,
      nextDue?.installment_id,
      accessToken,
    );

    setPaymentData(payment);
    setPopupOpen(true);
    payButtonPressed.current = false;
    setDataChanged(true);
  };

  const setNextInstallment = (result) => {
    // console.log(result);
    let isActive = false;
    for (let i = 0; i < result?.rows.length; i++) {
      if (result.rows[i]?.status === "pending") {
        updateInstallmentData(
          result.rows[i],
          result.rows[i - 1].paid_date,
          result.rows.length,
        );
        isActive = true;
        setNextDue(result.rows[i]);
        break;
      }
    }
    setIsAct(isActive);
  };

  const getInstallments = async () => {
    setLoading(true);
    console.log("KKKKKKKKK : ", newSchemeData);
    const result = await GetAllInstallments(
      newSchemeData?.userSchemeId,
      accessToken,
    );
    setInstallments(result?.rows);

    if (newSchemeData.status !== "Completed ✅") setNextInstallment(result);
    setLoading(false);
  };

  const updateInstallmentData = (params, lastPaidDate, planLength) => {
    const getTotalPaidDues = (paid_count: string) => {
      const planLength = scheme?.planLength;
      return `${paid_count}/${planLength}`;
    };

    const nextInstallment: MySchemeType = {
      amount: `₹ ${params.amount}/Month`,
      installmentId: params.installment_id,
      lastPaidDate: new Date(lastPaidDate).toLocaleDateString(),
      totalPaidDues: `${params.installment_number - 1}/${planLength}`,
      nextDueDate: new Date(params.due_date).toLocaleDateString(),
      status: "Active",
      type: "Monthly",
      schemeId: newSchemeData.schemeId,
      userSchemeId: newSchemeData.userSchemeId,
    };

    setNewSchemeData(nextInstallment);
  };

  const closePopup = () => {
    setPopupOpen(false);
    getInstallments();
  };

  useEffect(() => {
    getInstallments();
  }, []);

  return (
    <ScrollView>
      <View className="relative min-h-screen p-4 flex flex-col gap-5">
        <View className="flex flex-col gap-2">
          <AppText className="text-xl font-poppins-bold underline">
            Scheme Details
          </AppText>

          <View className="flex flex-row">
            <AppText className="font-poppins-semibold">Amount : </AppText>
            <AppText className="text-base text-wrap">
              {newSchemeData.amount}
            </AppText>
          </View>
          <View className="flex flex-row">
            <AppText className="font-poppins-semibold">Type : </AppText>
            <AppText className="text-base text-wrap">
              {newSchemeData.type}
            </AppText>
          </View>
          <View className="flex flex-row">
            <AppText className="font-poppins-semibold">
              Last Paid Date :{" "}
            </AppText>
            <AppText className="text-base text-wrap">
              {newSchemeData.lastPaidDate}
            </AppText>
          </View>
          <View className="flex flex-row">
            <AppText className="font-poppins-semibold">
              Next Due Date :{" "}
            </AppText>
            <AppText className="text-base text-wrap">
              {newSchemeData.nextDueDate}
            </AppText>
          </View>
          <View className="flex flex-row">
            <AppText className="font-poppins-semibold">
              Total Paid Dues :{" "}
            </AppText>
            <AppText className="text-base text-wrap">
              {newSchemeData.totalPaidDues}
            </AppText>
          </View>
          <View className="flex flex-row items-center">
            <AppText className="font-poppins-semibold">Status : </AppText>
            <AppText className="text-base text-wrap bg-green-600 p-1 rounded-md text-white">
              {isAct == true ? newSchemeData.status : "Completed"}
            </AppText>
          </View>
        </View>
        {newSchemeData?.status !== "Completed ✅" && (
          <View>
            <TouchableOpacity
              onPress={handleInstallmentPayment}
              className="bg-blue-500 rounded-md p-4"
            >
              <AppText className="text-white text-center">
                Pay ₹ {nextDue?.amount} for{" "}
                {new Date(nextDue?.due_date).toLocaleDateString()}
              </AppText>
            </TouchableOpacity>
          </View>
        )}
        <View>
          {loading ? (
            <Loader />
          ) : (
            installments && (
              <View>
                <InstallmentTable installments={installments} />
              </View>
            )
          )}
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
    </ScrollView>
  );
}

function InstallmentTable(data: any) {
  const { installments } = data;
  const [open, setOpen] = useState(false);

  return (
    <View className=" border border-gray-300 rounded-lg overflow-hidden">
      {/* Collapsible Header */}
      <Pressable
        onPress={() => setOpen(!open)}
        className="flex-row justify-between items-center p-4 bg-gray-200"
      >
        <Text className="font-semibold text-lg">Installments Details</Text>
        <Text>{open ? "▲" : "▼"}</Text>
      </Pressable>

      {/* Collapsible Content */}
      {open && (
        <ScrollView horizontal>
          <View className="border-t border-gray-300">
            {/* Header */}
            <View className="flex-row bg-gray-100">
              <Text className="w-16 flex-1 p-3 font-semibold">I.No</Text>
              <Text className="w-24 flex-1 p-3 font-semibold">Due Date</Text>
              <Text className="w-24 flex-1 p-3 font-semibold">Paid Date</Text>
              <Text className="w-24 flex-1 p-3 font-semibold">Status</Text>
            </View>

            {/* Rows */}
            {installments.map((item) => (
              <View
                key={item.installment_id}
                className="flex-row border-t border-gray-300"
              >
                <Text className="text-center w-16 flex-1 p-3">
                  {item.installment_number}
                </Text>

                <Text className="text-center w-32 flex-1 p-3">
                  {new Date(item.due_date).toLocaleDateString()}
                </Text>

                <Text className="text-center w-32 flex-1 p-3">
                  {item.paid_date === null
                    ? "-"
                    : new Date(item.paid_date).toLocaleDateString()}
                </Text>

                <Text
                  className={`w-32 text-center flex-1 p-3 capitalize ${
                    item.status === "paid" ? "text-green-600" : "text-black"
                  }`}
                >
                  {item.status}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

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
