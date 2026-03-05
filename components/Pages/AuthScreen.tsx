import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { AppText } from "../common";
import {
  LoginPayload,
  RegisterPayload,
  UserLogin,
  UserRegister,
} from "../../services/AuthService";
import { logger } from "../../utils/logger";
import { useAuth } from "../../context/AuthContext";
import { HomeScreenNavigationProp } from "../../App";

const OTP_LENGTH = 4;

type AuthProps = {
  navigation: HomeScreenNavigationProp;
};

export default function AuthScreen({ navigation }: AuthProps) {
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login state
  const [loginPhone, setLoginPhone] = useState<string>("");
  const [loginpassword, setLoginPassword] = useState<string>("");

  const [loginOtp, setLoginOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill(""),
  );
  const loginInputs = useRef<(TextInput | null)[]>([]);

  // Register state
  const [regName, setRegName] = useState<string>("");
  const [regPhone, setRegPhone] = useState<string>("");
  const [regOtp, setRegOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const regInputs = useRef<(TextInput | null)[]>([]);
  const [regPassword, setRegPassword] = useState<string>("");

  const [regResponse, setRegResponse] = useState<{
    msg: string;
    status: number;
  }>({ msg: "", status: 0 });

  const [loginResponse, setLoginResponse] = useState<{
    msg: string;
    status: number;
  }>({ msg: "", status: 0 });

  // Shared OTP handlers
  function handleOtpChange(
    otpArray: string[],
    setOtpArray: React.Dispatch<React.SetStateAction<string[]>>,
    inputsRef: React.RefObject<(TextInput | null)[]>,
    text: string,
    index: number,
  ) {
    if (!/^\d?$/.test(text)) return;

    const newOtp = [...otpArray];
    newOtp[index] = text;
    setOtpArray(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    otpArray: string[],
    inputsRef: React.RefObject<(TextInput | null)[]>,
    index: number,
  ) {
    if (e.nativeEvent.key === "Backspace" && !otpArray[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  const handleRegister = async () => {
    const payload: RegisterPayload = {
      mobile_no: regPhone,
      name: regName,
      password: regPassword,
    };
    const result = await UserRegister(payload);
    logger.debug(result);
    if (result) {
      setRegResponse({ msg: result, status: 1 });
    } else {
      setRegResponse({ msg: "Register Failed", status: 0 });
    }
  };

  const handleLogin = async () => {
    const payload: LoginPayload = {
      mobile_no: loginPhone,
      password: loginpassword,
    };

    const result = await login(payload);

    if (result.status) {
      navigation.navigate("Home");
    } else {
      setLoginResponse(result);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjusts for iOS/Android
      style={styles.container}
    >
      <View className="flex-1 bg-[#F5EFE6] px-6 pt-12">
        {/* Tabs */}
        <View className="flex-row justify-center mb-8">
          <TouchableOpacity
            onPress={() => setActiveTab("login")}
            className="mx-4 pb-2"
          >
            <AppText
              className={`text-lg font-poppins-semibold ${
                activeTab === "login" ? "text-[#D4AF37]" : "text-gray-500"
              }`}
            >
              Login
            </AppText>
            {activeTab === "login" && (
              <View className="h-1 bg-[#D4AF37] rounded-full mt-1" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("register")}
            className="mx-4 pb-2"
          >
            <AppText
              className={`text-lg font-poppins-semibold ${
                activeTab === "register" ? "text-[#D4AF37]" : "text-gray-500"
              }`}
            >
              Register
            </AppText>
            {activeTab === "register" && (
              <View className="h-1 bg-[#D4AF37] rounded-full mt-1" />
            )}
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {activeTab === "login" && (
            <View className="bg-white rounded-3xl p-6 shadow-lg">
              <AppText className="text-2xl font-poppins-bold text-center underline text-[#1F2937] mb-6">
                Login
              </AppText>

              {/* Phone Input */}
              <AppText className="text-gray-600 mb-2 font-poppins-semibold">
                Mobile Number
              </AppText>
              <TextInput
                value={loginPhone}
                onChangeText={setLoginPhone}
                keyboardType="phone-pad"
                placeholder="Enter mobile number"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-5 bg-gray-50"
              />

              {/* Password Input */}
              <AppText className="text-gray-600 mb-2 font-poppins-semibold">
                Password
              </AppText>
              <TextInput
                value={loginpassword}
                onChangeText={setLoginPassword}
                secureTextEntry={true}
                placeholder="Enter password"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-5 bg-gray-50"
              />

              {/* OTP
            <AppText className="text-gray-600 mb-2">Enter OTP</AppText>
            <View className="flex-row justify-between mb-6">
              {loginOtp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    loginInputs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) =>
                    handleOtpChange(
                      loginOtp,
                      setLoginOtp,
                      loginInputs,
                      text,
                      index,
                    )
                  }
                  onKeyPress={(e) =>
                    handleKeyPress(e, loginOtp, loginInputs, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-14 h-14 text-center text-xl font-poppins-semibold 
                             border-2 border-[#D4AF37] 
                             rounded-xl bg-[#FFF8E7]"
                />
              ))}
            </View> */}
              {loginResponse.msg && (
                <View className="flex items-center mb-4">
                  <AppText
                    className={`${loginResponse.status === 1 ? "text-green-500" : "text-red-500"} font-poppins-semibold`}
                  >
                    {!loginResponse.status && loginResponse.msg}
                  </AppText>
                </View>
              )}
              <TouchableOpacity
                onPress={handleLogin}
                className="bg-[#D4AF37] py-4 rounded-xl shadow-md active:opacity-80"
              >
                <AppText className="text-center text-white font-poppins-semibold text-lg">
                  Login
                </AppText>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === "register" && (
            <View className="bg-white rounded-3xl p-6 shadow-lg">
              <AppText className="text-2xl font-poppins-bold text-center underline text-[#1F2937] mb-6">
                Register
              </AppText>

              {/* Name */}
              <AppText className="text-gray-600 mb-2">Full Name</AppText>
              <TextInput
                value={regName}
                onChangeText={setRegName}
                placeholder="Enter your name"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-50"
              />

              {/* Phone */}
              <AppText className="text-gray-600 mb-2">Mobile Number</AppText>
              <TextInput
                value={regPhone}
                onChangeText={setRegPhone}
                keyboardType="phone-pad"
                placeholder="Enter mobile number"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-5 bg-gray-50"
              />

              {/* Password */}
              <AppText className="text-gray-600 mb-2">Password</AppText>
              <TextInput
                secureTextEntry={true}
                value={regPassword}
                onChangeText={setRegPassword}
                placeholder="Enter Password"
                className="border border-gray-300 rounded-xl px-4 py-3 mb-5 bg-gray-50"
              />

              {/* OTP
            <AppText className="text-gray-600 mb-2">Enter OTP</AppText>
            <View className="flex-row justify-between mb-6">
              {regOtp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    regInputs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) =>
                    handleOtpChange(regOtp, setRegOtp, regInputs, text, index)
                  }
                  onKeyPress={(e) =>
                    handleKeyPress(e, regOtp, regInputs, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-14 h-14 text-center text-xl font-bold 
                             border-2 border-[#D4AF37] 
                             rounded-xl bg-[#FFF8E7]"
                />
              ))}
            </View> */}
              {regResponse.msg && (
                <View className="flex items-center mb-4">
                  <AppText
                    className={`${regResponse.status === 1 ? "text-green-500" : "text-red-500"} font-poppins-semibold`}
                  >
                    {regResponse.msg}
                  </AppText>
                </View>
              )}
              <TouchableOpacity
                onPress={handleRegister}
                className="bg-[#D4AF37] py-4 rounded-xl shadow-md active:opacity-80"
              >
                <AppText className="text-center text-white font-poppins-semibold text-lg">
                  Register
                </AppText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    padding: 50,
    flex: 1,
    justifyContent: "space-around",
  },
  textInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
