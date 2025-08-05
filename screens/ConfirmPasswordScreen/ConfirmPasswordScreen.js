import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "../../utils/toast";
import styles from "./style";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { register, reset, verify } from "../../store/reducers/auth/authSlice";
const { width, height } = Dimensions.get("window");

const ConfirmPasswordScreen = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const CELL_COUNT = 5;
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const Verification_details = {
    userId: route.params.data?.user?._id,
    uniqueString: value,
  };
  const verifyCode = () => {
    dispatch(verify({ ...Verification_details }));
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isSuccess && user?.message === "verified") {
      setModalVisible(false);
      Alert.alert(
        "Information",
        "Validation Successful",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.replace("Login", {
                data: user,
              });
            },
          },
        ],
        { cancelable: false }
      );
    }

    if (isSuccess && message === "Verification email sent successfully") {
      Alert.alert(
        "Information",
        "A mail containing a 5 digit code has been sent",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("ConfirmPassword", {
                data: user,
              });
              dispatch(reset());
            },
          },
        ],
        { cancelable: false }
      );
    }

    if (isError && message) {
      Alert.alert(
        "Information",
        message,
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    }

    if (isSuccess) {
      dispatch(reset());
    }

    if (isError && message) {
      dispatch(reset());
    }
  }, [isError, isLoading, isSuccess]);

  const handleResend = () => {
    dispatch(reset());
    const resendDetails = {
      Firstname:
        route?.params?.data?.user?.Firstname || route?.params?.data?.Firstname,
      Lastname:
        route?.params?.data?.user?.Lastname || route?.params?.data?.Lastname,
      Email: route?.params?.data?.user?.Email || route?.params?.data?.Email,
      Password: route?.params?.data?.unhashed || route?.params?.data?.Password,
      ConfirmPassword:
        route?.params?.data?.unhashed || route?.params?.data?.ConfirmPassword,
    };

    dispatch(register(resendDetails));
    setValue("");
  };

  return (
    <View style={styles.container} className="bg-white">

      <ImageBackground
        source={require("../../assets/images/confirm.jpg")} // Replace with your image source
        style={styles.backgroundImage}
        resizeMode="contain">
        <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => navigation.navigate("Register")}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View>
                    <Text style={styles.modalTitle}>
                      Enter Confirmation PIN
                    </Text>
                    <Text>
                      OTP sent to{" "}
                      {route.params?.data?.user?.Email ||
                        route?.params?.data?.Email}
                    </Text>
                  </View>
                  <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    onFulfill={() => {
                      navigation.navigate("Main");
                    }}
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                      <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    )}
                  />

                  <View className=" mt-5 rounded-full flex flex-col items-center justify-center">
                    <TouchableOpacity
                      onPress={verifyCode}
                      className="p-4 rounded-full flex flex-col items-center justify-center mt-2"
                      style={{
                        backgroundColor: Colors.primary,
                        width: width / 2,
                      }}>
                      <Text
                        className="text-white font-ca font-bold"
                        style={{ fontFamily: "sen" }}>
                        {isLoading || loading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          "Confirm"
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={handleResend}
                    style={{ alignSelf: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginRight: 2,
                        marginTop: 10,
                        color: Colors.primary,
                        alignSelf: "flex-end",
                        paddingHorizontal: 20,
                      }}>
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ConfirmPasswordScreen;
