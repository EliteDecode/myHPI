import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-element-textinput";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome
import Colors from "../helpers/Colors";
import { useNavigation } from "@react-navigation/native";
import MyStatusBar from "../helpers/MyStatusBar";
import { loginSchema } from "../utils/schemas";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../store/reducers/auth/authSlice";
const { width, height } = Dimensions.get("window");
import ToastManager, { Toast } from "toastify-react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const initialValues = {
    Email: "",
    Password: "",
  };

  const handleLogin = (values) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (isSuccess && user) {
      Alert.alert(
        "Information",
        "Congratulations you've Logged In Successfully",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.replace("Main");
              dispatch(reset());
            },
          },
        ],
        { cancelable: false }
      );
    }

    if (isError && message) {
      Toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
    }

    if (isError && message) {
      dispatch(reset());
    }
  }, [isError, isLoading, isSuccess, message, user]);

  return (
    <>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ToastManager
        textStyle={{ fontSize: 12 }}
        height={50}
        position="top"
        width={400}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values,
          errors,
          touched,
        }) => (
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              paddingVertical: Platform.OS === "ios" ? 30 : 50,
              paddingHorizontal: Platform.OS === "ios" ? 10 : 20,
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
                  marginTop: 80,
                }}>
                <Image
                  source={require("../assets/images/onboarding/onBoarding2.png")}
                  style={{
                    width: width / 1.4,
                    height: height / 4,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: Colors.dark,
                  }}>
                  Welcome Back!
                </Text>
                <Text style={{ fontSize: 13 }}>
                  Please provide your valid Email address and Password
                </Text>
              </View>

              <View style={styles.container}>
                <TextInput
                  value={values.Email}
                  onChangeText={handleChange("Email")}
                  onBlur={handleBlur("Email")}
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="gray"
                  renderLeftIcon={() => (
                    <FontAwesome
                      name="envelope"
                      size={15}
                      color={Colors.primary}
                      style={{ width: "10%", opacity: 0.6 }}
                    />
                  )}
                  // ... (other props)
                />
                {touched.Email && errors.Email && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginLeft: 5,
                      marginBottom: 3,
                    }}>
                    {errors.Email}
                  </Text>
                )}

                <TextInput
                  value={values.Password}
                  onChangeText={handleChange("Password")}
                  onBlur={handleBlur("Password")}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  mode="password"
                  renderLeftIcon={() => (
                    <FontAwesome
                      name="lock"
                      size={20}
                      color={Colors.primary}
                      style={{ width: "10%", opacity: 0.6 }}
                    />
                  )} // ... (other props)
                />
                {touched.Password && errors.Password && (
                  <Text
                    style={{
                      color: "red",
                      fontSize: 12,
                      marginLeft: 5,
                      marginBottom: 3,
                    }}>
                    {errors.Password}
                  </Text>
                )}

                <TouchableOpacity
                  onPress={isLoading ? null : handleSubmit}
                  style={{ marginBottom: 10, marginTop: 10 }}>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      borderRadius: 30,
                      paddingVertical: 18,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "sen",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}>
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        "LOGIN"
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.replace("Forgot Password")}
                  style={{ alignSelf: "flex-end" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: 2,
                      alignSelf: "flex-end",
                    }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => navigation.replace("Register")}
                style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Don't have an account?{" "}
                  <Text style={{ color: "blue" }}>Sign Up</Text>
                </Text>
              </TouchableOpacity>

              <View style={{ marginBottom: 300 }}></View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
  },
  input: {
    height: 55,
    paddingHorizontal: 18,
    borderRadius: 30,
    fontSize: 14,
    borderColor: Colors.gray,
    backgroundColor: Colors.gray,

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
});
