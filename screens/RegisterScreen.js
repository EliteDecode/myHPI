import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-element-textinput";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../helpers/Colors";
import { useNavigation } from "@react-navigation/native";
import MyStatusBar from "../helpers/MyStatusBar";
import { registerFields } from "../utils/data";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false); // Add this line

  const navigation = useNavigation();

  return (
    <>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}>
        <ScrollView
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: Platform.OS === "ios" ? 10 : 40,
            }}>
            <Image
              source={require("../assets/images/onboarding/onBoarding1.png")}
              style={{
                width: width / 1.4,
                height: height / 4,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                fontSize: 30,
                fontFamily: "ca",
                fontWeight: "bold",
                color: Colors.dark,
              }}>
              Welcome!
            </Text>
            <Text style={{ fontSize: 13 }}>
              Please provide your details to create an account
            </Text>
          </View>

          <View style={styles.container}>
            {registerFields.map((field, index) => (
              <TextInput
                key={index}
                showIcon
                //   value={email}
                style={styles.input}
                inputStyle={styles.inputStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                // label="Email"
                placeholder={field.placeholder}
                placeholderTextColor="gray"
                focusColor={Colors.primary}
                fontFamily="ca"
                renderLeftIcon={() => field.icon}
              />
            ))}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => setAgreeTerms(!agreeTerms)}
                style={styles.checkbox}>
                {agreeTerms ? (
                  <FontAwesome
                    name="check-square-o"
                    size={24}
                    color={Colors.primary}
                  />
                ) : (
                  <FontAwesome name="square-o" size={24} color={Colors.gray} />
                )}
                <Text style={styles.checkboxText}>
                  Agree to Terms and Conditions
                </Text>
              </TouchableOpacity>
            </View>

            <View className=" mt-5 rounded-full flex flex-col items-center justify-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("ConfirmPassword")}
                className="p-4 rounded-full flex flex-col items-center justify-center mt-2"
                style={{ backgroundColor: Colors.primary, width: width / 2 }}>
                <Text
                  className="text-white font-ca font-bold"
                  style={{ fontFamily: "sen" }}>
                  Complete Registeration
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="items-center">
            <Text className="text-[16px] font-bold">
              Already have an account?{" "}
              <Text className="text-blue-500"> Login </Text>
            </Text>
          </TouchableOpacity>

          <View style={{ marginBottom: 300 }}></View>
        </ScrollView>
      </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
  },
  input: {
    height: 55,
    paddingHorizontal: 18,
    borderRadius: 30,

    borderColor: Colors.gray,
    backgroundColor: Colors.gray,
    marginBottom: 8,
    marginTop: 8,
  },
  inputStyle: { fontSize: 14 },
  labelStyle: {
    fontSize: 12,
    position: "absolute",

    top: -8,
    paddingHorizontal: 8,
    marginLeft: -4,
    zIndex: 20,
  },
  placeholderStyle: { fontSize: 14, zIndex: 20 },
  textErrorStyle: { fontSize: 14 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
