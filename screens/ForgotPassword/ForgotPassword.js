import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput } from "react-native-element-textinput";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../helpers/Colors";
import MyStatusBar from "../../helpers/MyStatusBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Toast from "../../utils/toast";
import { forgotPassword, reset } from "../../store/reducers/auth/authSlice";
import { rS, rVS } from "../../styles/responsiveness";

const { width, height } = Dimensions.get("window");

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const handleForgotPassword = (values) => {
    dispatch(forgotPassword(values));
    setEmail(values.email);
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  useEffect(() => {
    if (isSuccess && message === "success") {
      Alert.alert(
        "Information",
        `A mail containing your new password has been sent to ${email}`,
        [
          {
            text: "OK",
            onPress: () => {
              navigation.replace("Login");
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

      <View style={styles.container}>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => handleForgotPassword(values)}
          validationSchema={validationSchema}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
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
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={[
                  styles.input,
                  {
                    borderColor: touched.email && errors.email ? "red" : "#ccc",
                  },
                ]}
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
              />
              {touched.email && errors.email && (
                <Text style={{ color: "red", marginLeft: 4 }}>
                  {errors.email}
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
                      "Reset Password"
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  input: {
    height: 55,
    paddingHorizontal: 18,
    borderRadius: 30,
    fontSize: 14,
    borderColor: Colors.gray,
    backgroundColor: Colors.gray,
    marginTop: 15,
    marginBottom: 3,
  },
  button: {
    backgroundColor: "#478AFB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPassword;
