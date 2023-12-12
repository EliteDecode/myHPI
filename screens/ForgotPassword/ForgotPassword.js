import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Colors from "../../helpers/Colors";
import MyStatusBar from "../../helpers/MyStatusBar";

const { width, height } = Dimensions.get("window");

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Implement logic for sending password reset email
    console.log("Password reset email sent to:", email);
  };

  return (
    <>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}>
          <Image
            source={require("../../assets/images/forgotPassword2.png")}
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
            Forgot Password
          </Text>
          <Text style={{ fontSize: 13 }} className="">
            Please provide your valid email address
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
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
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#478AFB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPassword;
