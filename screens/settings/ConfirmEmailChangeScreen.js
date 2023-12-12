import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import BackButton from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailChangeScreen = () => {
  const CELL_COUNT = 5; // You can adjust the number of cells as needed
  const [value, setValue] = useState("");
  const ref = useRef();

  const navigation = useNavigation();

  const getCellOnLayoutHandler = (index) => {
    return ({ nativeEvent: { layout } }) => {
      if (index === 0 && ref.current) {
        ref.current.focus();
      }
    };
  };

  const handleConfirm = () => {
    navigation.navigate("Main");
  };

  return (
    <>
      <BackButton color={Colors.primary} />
      <View style={styles.container}>
        <Text>A 5digit code was sent to @israelOgenekaro@gmail.com</Text>

        <CodeField
          ref={ref}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          onFulfill={handleConfirm}
          textContentType="oneTimeCode"
          rootStyle={styles.codeFieldRoot}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary,
  },
  codeFieldRoot: {
    marginTop: 20,
    marginBottom: 20,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: Colors.primary,
    textAlign: "center",
    marginHorizontal: 10,
  },
  focusCell: {
    borderColor: Colors.primary,
  },
  confirmButtonContainer: {
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "50%",
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmEmailChangeScreen;
