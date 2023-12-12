import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../../helpers/Colors";
import BackButton from "../../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleChangePassword = (values) => {
    // Add logic to handle the password change
    console.log("Old Password:", values.oldPassword);
    console.log("New Password:", values.newPassword);
    console.log("Confirm New Password:", values.confirmNewPassword);

    // Implement password change logic and navigation
    navigation.navigate("Confirm Password", {
      screen: route.name,
    });
  };

  return (
    <>
      <BackButton color={Colors.primary} />
      <View style={styles.container}>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          onSubmit={(values) => handleChangePassword(values)}
          validate={(values) => {
            const errors = {};

            // Add password validation logic here if needed

            return errors;
          }}>
          {({ values, handleChange, handleSubmit, errors }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={values.oldPassword}
                onChangeText={handleChange("oldPassword")}
                secureTextEntry
              />

              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={values.newPassword}
                onChangeText={handleChange("newPassword")}
                secureTextEntry
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={values.confirmNewPassword}
                onChangeText={handleChange("confirmNewPassword")}
                secureTextEntry
              />

              {errors && errors.confirmNewPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmNewPassword}
                </Text>
              )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
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
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
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
