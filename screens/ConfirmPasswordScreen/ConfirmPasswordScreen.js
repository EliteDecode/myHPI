import React, { useState } from "react";
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
} from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import styles from "./style";
import Colors from "../../helpers/Colors";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const ConfirmPasswordScreen = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  const CELL_COUNT = 5;

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate("Main");
    // Add logic for handling confirmation and closing the modal
  };

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
            onRequestClose={() => closeModal()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View>
                    <Text style={styles.modalTitle}>
                      Enter Confirmation PIN
                    </Text>
                    <Text>OTP sent to oghenekaroisrael089@gmail.com</Text>
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
                      console.log("hhh");
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
                      onPress={handleCloseModal}
                      className="p-4 rounded-full flex flex-col items-center justify-center mt-2"
                      style={{
                        backgroundColor: Colors.primary,
                        width: width / 2,
                      }}>
                      <Text
                        className="text-white font-ca font-bold"
                        style={{ fontFamily: "sen" }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
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
