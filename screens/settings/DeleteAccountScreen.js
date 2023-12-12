import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";
import BackButton from "../../components/BackButton";

const DeleteAccountScreen = ({ navigation }) => {
  const handleDeleteAccount = () => {
    // Add logic to delete the account
    console.log("Account deleted!");
    // Implement account deletion logic and navigate to the appropriate screen
  };

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
          onPress={handleDeleteAccount}>
          <Text style={styles.confirmButtonText}>Confirm Delete</Text>
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
