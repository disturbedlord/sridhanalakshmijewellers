import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText, BackendAPI, Loader, PriceView, Spinner } from "../common";
import { useEffect, useState } from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Address, Addresses } from "../../Types/AddressesTypes";
import {
  DeleteAddress,
  GetAllAddresses,
  SaveAddress,
  UpdateAddress,
} from "../../services/AddressService";
import { GetCart } from "../../services/CartService";
import { CartItem } from "../../Types/CartTypes";
import { logger } from "../../utils/logger";

export default function CheckoutScreen({ navigation }: any) {
  const [addresses, setAddresses] = useState<Address[] | null>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<Number>(0);
  const getAllAddress = async () => {
    setLoading(true);
    const result = await GetAllAddresses();
    setAddresses(result);
    setSelectedAddress(result[0]);

    setLoading(false);
  };
  const [userSelectedAddress, setSelectedAddress] = useState<Address | null>(
    null,
  );
  const [orderId, setOrderId] = useState<String>("#ORD12345");

  const getCartItem = async () => {
    setCartLoading(true);
    try {
      const cartData = await GetCart();
      if (cartData?.success) {
        setCarts(cartData.items);
      }
    } catch (err) {
      logger.debug("Cart Screen Error : ", err);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    getAllAddress();
    getCartItem();
  }, []);

  useEffect(() => {
    getTotalPrice();
  }, [carts, addresses]); // runs every time carts changes

  const newAddressInitialData = [
    { value: "", text: "Name" },
    { value: "", text: "Phone No" },
    { value: "", text: "Line 1" },
    { value: "", text: "Line 2" },
    { value: "", text: "City" },
    { value: "", text: "State" },
    { value: "", text: "Pincode" },
    { value: "", text: "id" },
  ];

  const getTotalPrice = () => {
    console.log("cAlled", carts);
    let subTotal = 0;
    let shipping = 0;
    carts.forEach((item) => {
      subTotal += Number(item.price) * item.quantity;
    });

    if (subTotal > 0) {
      shipping = 550;
    }

    setTotalPrice(subTotal + shipping);
  };

  const HandleCheckout = () => {
    navigation.navigate("OrderScreen", {
      address: userSelectedAddress,
      orderId: orderId,
    });
  };

  return (
    <View className="flex-1 ">
      <View className="h-[85%]">
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
          <View className="pt-2 px-6">
            <AppText className="font-poppins-bold text-3xl">Checkout</AppText>
          </View>
          <View className=" px-6 pb-2 flex flex-row justify-between items-center">
            <AppText className="font-poppins-semibold text-lg">
              Select Address
            </AppText>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="bg-gray-300 rounded-full p-2 flex justify-center items-center"
            >
              <MaterialIcons name="add-home" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="">
            <View className=" px-6 py-0">
              <View className="">
                {loading ? (
                  <Spinner text={"Fetching Addresses"} />
                ) : (
                  <View>
                    {addresses && addresses.length > 0 ? (
                      <View className="mb-0">
                        <AddressSelector
                          addresses={addresses}
                          refreshAddress={(val) =>
                            val === true && getAllAddress()
                          }
                          selectedAddress={(address: Address) => {
                            console.log("ADDESS : ", address);
                            setSelectedAddress(address);
                          }}
                        />
                      </View>
                    ) : (
                      <View>
                        <AppText className="text-center text-gray-500">
                          Nothing to show
                        </AppText>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className="h-px bg-gray-200 my-2" />

          <View className="px-6 py-2">
            <AppText className="font-poppins-semibold text-lg">
              Order Summary
            </AppText>
            {cartLoading ? (
              <Spinner text="Getting latest Cart" />
            ) : (
              <View>
                {carts.map((cartItem) => {
                  return (
                    <View
                      key={cartItem.product_id}
                      className="flex flex-row py-2 gap-2"
                    >
                      <Image
                        source={{ uri: `${BackendAPI}${cartItem.image}` }}
                        className="w-16 h-16 rounded-lg"
                      />
                      <View className="flex-1 flex-row justify-between ">
                        <View>
                          <AppText className="text-sm">{cartItem.name}</AppText>
                          <AppText className="text-sm">
                            Qty : {cartItem.quantity}
                          </AppText>
                        </View>
                        <View>
                          <PriceView
                            className="  text-sm"
                            price={Number(cartItem.price) * cartItem.quantity}
                          />
                        </View>
                      </View>
                    </View>
                  );
                })}
                <View className="flex-1 flex-row justify-center">
                  <AppText className="">
                    Total :{" "}
                    <PriceView
                      price={parseFloat(String(totalPrice))}
                      className="font-poppins-bold"
                    />
                  </AppText>
                </View>
              </View>
            )}
          </View>
          <AddressModal
            initialData={newAddressInitialData}
            visible={modalVisible}
            setVisible={(e) => {
              setModalVisible(e);
              getAllAddress();
            }}
            isEdit={false}
          />
        </ScrollView>
      </View>

      <View className="absolute h-[15%] bottom-0 w-full p-4 bg-white">
        <TouchableOpacity
          onPress={HandleCheckout}
          className="my-5 bg-blue-500 p-4 rounded-md"
        >
          <AppText className="text-center font-poppins-bold text-white">
            Pay{" "}
            <PriceView
              price={parseFloat(String(totalPrice))}
              className="font-poppins-bold"
            />
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const AddressModal = ({
  visible,
  setVisible,
  initialData,
  isEdit = false,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  initialData: { text: string; value: string }[];
  isEdit: boolean;
}) => {
  const [form, setForm] = useState(initialData);
  const [addressLoading, setAddressLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) =>
      prev.map((item) => (item.text === key ? { ...item, value } : item)),
    );
  };

  const handleSubmit = async () => {
    let isEmpty: boolean = false;
    for (let i = 0; i < form.length; i++) {
      if (form[i].text === "id") continue;
      if (form[i].value === "") {
        isEmpty = true;
        break;
      }
    }

    if (isEmpty) return;

    setAddressLoading(true);
    // Here you can call your API e.g. postRequest('/address', form)
    let address: Address = {
      name: form[0].value,
      phone: form[1].value,
      line1: form[2].value,
      line2: form[3].value,
      city: form[4].value,
      state: form[5].value,
      pincode: form[6].value,
      id: form[7].value,
    };
    if (isEdit) await UpdateAddress(address);
    else await SaveAddress(address);
    setAddressLoading(false);
  };

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Modal visible={visible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-2xl h-[60%]">
            <View className=" px-6 py-4 flex flex-row justify-between">
              <AppText className="text-xl font-poppins-semibold ">
                Add Address
              </AppText>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close-circle" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <ScrollView className=" flex-1 px-6">
              {form.map((item) => {
                if (item.text === "id") return null;
                return (
                  <View key={item.text} className="mb-2">
                    <AppText className="text-gray-700 mb-0.5 capitalize">
                      {item.text}
                      {<AppText className="text-red-600">*</AppText>}
                    </AppText>
                    <TextInput
                      className="border border-gray-300 rounded-lg p-2 bg-white"
                      value={item.value}
                      onChangeText={(text) => handleChange(item.text, text)}
                      keyboardType={
                        item.text === "Phone No" || item.text === "Pincode"
                          ? "numeric"
                          : "default"
                      }
                    />
                  </View>
                );
              })}
            </ScrollView>
            <Pressable
              onPress={handleSubmit}
              className="bg-blue-500 py-3 rounded-lg m-4 "
            >
              {!addressLoading ? (
                <AppText className="text-white text-center font-poppins-semibold">
                  {isEdit ? "Update Address" : "Save Address"}
                </AppText>
              ) : (
                <View className="flex flex-row justify-center items-center">
                  <ActivityIndicator
                    size="small"
                    className="px-4"
                    color={"white"}
                  />
                  <AppText className="text-white text-center font-poppins-semibold">
                    Saving
                  </AppText>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

type AddressInput = {
  id: string;
  title: string;
  subtitle: string;
};

function AddressSelector({
  addresses,
  refreshAddress,
  selectedAddress,
}: {
  addresses: Address[];
  refreshAddress: (val: boolean) => void;
  selectedAddress: (val: Address) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null | undefined>(
    addresses[0].id,
  );
  const [addressSelected, setAddress] = useState<Address>(addresses[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState<{ text: string; value: string }[]>([]);

  const HandleAddressEdit = (address: Address) => {
    const modifyData = [
      { value: address.name, text: "Name" },
      { value: address.phone, text: "Phone No" },
      { value: address.line1, text: "Line 1" },
      { value: address.line2, text: "Line 2" },
      { value: address.city, text: "City" },
      { value: address.state, text: "State" },
      { value: address.pincode, text: "Pincode" },
      { value: address.id, text: "id" },
    ];
    setForm(modifyData);
    setModalVisible(true);
  };

  const HandleAddressDelete = async (id: string | null | undefined) => {
    if (!id) return;
    console.log("Delete Id : ", id);
    const deleteAddress = await DeleteAddress(id);
    refreshAddress(true);
  };
  return (
    <View className=" flex gap-3">
      {addresses.map((address) => {
        const { id, name, city, line1, state, line2, pincode, phone } = address;
        const isSelected = selectedId === id;

        return (
          <Pressable
            key={id}
            onPress={() => {
              console.log("ODL : ", address);
              setSelectedId(id);
              setAddress(address);
              selectedAddress(address);
            }}
            className={`flex-row items-center justify-between border rounded-lg p-4 w-full ${
              isSelected ? "border-blue-600" : "border-gray-300"
            }`}
          >
            {/* Left section: icon + text */}
            <View className="pl-2  flex-col  items-start gap-3 w-[80%]">
              <View className="">
                <AppText
                  className={`font-poppins-semibold text-base ${
                    isSelected ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {name}
                </AppText>
                <AppText
                  className={`${isSelected ? "text-gray-800" : "text-gray-400"} text-sm`}
                >{`${line1},${line2},${city},${state},Pin - ${pincode}`}</AppText>
              </View>
              <View>
                <AppText
                  className={`${isSelected ? "text-gray-800" : "text-gray-400"} text-sm`}
                >
                  Mobile no : {phone}
                </AppText>
              </View>
            </View>

            {/* Right section: radio + edit/delete */}
            <View className="flex-col items-end justify-center gap-4 w-[20%]">
              {/* Edit icon */}
              <TouchableOpacity onPress={() => HandleAddressEdit(address)}>
                <Feather
                  name="edit-2"
                  size={20}
                  color={`${isSelected ? "#1f2937" : "#9ca3af"}`}
                />
              </TouchableOpacity>

              {/* Delete icon */}
              <TouchableOpacity onPress={() => HandleAddressDelete(id)}>
                <MaterialIcons
                  name="delete-outline"
                  size={25}
                  color={`${isSelected ? "#1f2937" : "#9ca3af"}`}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        );
      })}
      <AddressModal
        initialData={form}
        visible={modalVisible}
        setVisible={(e) => {
          setModalVisible(e);
          refreshAddress(true);
        }}
        isEdit={true}
      />
    </View>
  );
}
