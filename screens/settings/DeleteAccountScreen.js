import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../../helpers/Colors";
import BackButton from "../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, reset } from "../../store/reducers/auth/authSlice";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const DeleteAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
  };

  useEffect(() => {
    if (isSuccess && message) {
      Alert.alert(
        "Information",
        "Account Deleted successfully",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
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
      <View style={styles.container}>
        <Text style={styles.warningText}>
          Warning: Deleting your account will permanently remove all your data.
        </Text>

        <Text style={styles.warningText}>
          This action cannot be undone. Are you sure you want to proceed?
        </Text>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={isLoading ? null : handleDeleteAccount}>
          <Text style={styles.confirmButtonText}>
            {" "}
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Confirm Delete"
            )}
          </Text>
        </TouchableOpacity>
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
  warningText: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.primary,
  },
  confirmButton: {
    backgroundColor: "red", // Change to your desired color
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeleteAccountScreen;
