import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../../helpers/Colors";
import BackButton from "../../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { TextInput } from "react-native-element-textinput";
import { changePassword } from "../../utils/schemas";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome
import { useDispatch, useSelector } from "react-redux";
import { reset, updatePassword } from "../../store/reducers/auth/authSlice";
import ToastManager, { Toast } from "toastify-react-native";
import { CommonActions } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChangePassword = (values) => {
    dispatch(updatePassword(values));
  };

  useEffect(() => {
    if (isSuccess && message) {
      Alert.alert(
        "Information",
        "Password updated successfully",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Settings" }],
                })
              );
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
            onPress: () => {
              dispatch(reset());
            },
          },
        ],
        { cancelable: false }
      );
    }

    dispatch(reset());
  }, [isError, isLoading, isSuccess]);

  return (
    <>
      <BackButton color={Colors.primary} />
      <ToastManager
        textStyle={{ fontSize: 12 }}
        height={50}
        position="bottom"
        width={400}
      />
      <View style={styles.container}>
        <Formik
          initialValues={{
            Password: "",
            NewPassword: "",
            ConfirmNewPassword: "",
          }}
          validationSchema={changePassword}
          onSubmit={(values) => handleChangePassword(values)}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            handleBlur,
            touched,
          }) => (
            <>
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

              <TextInput
                value={values.NewPassword}
                onChangeText={handleChange("NewPassword")}
                onBlur={handleBlur("NewPassword")}
                style={styles.input}
                placeholder="New Password"
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
              {touched.NewPassword && errors.NewPassword && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginLeft: 5,
                    marginBottom: 3,
                  }}>
                  {errors.NewPassword}
                </Text>
              )}

              <TextInput
                value={values.ConfirmNewPassword}
                onChangeText={handleChange("ConfirmNewPassword")}
                onBlur={handleBlur("ConfirmNewPassword")}
                style={styles.input}
                placeholder="Confirm New Password"
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
              {touched.ConfirmNewPassword && errors.ConfirmNewPassword && (
                <Text
                  style={{
                    color: "red",
                    fontSize: 12,
                    marginLeft: 5,
                    marginBottom: 3,
                  }}>
                  {errors.ConfirmNewPassword}
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
                      "Update"
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

    marginTop: 8,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
