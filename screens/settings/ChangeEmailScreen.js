// Import necessary components and libraries
import React, { useState } from "react";
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

const ChangeEmailScreen = () => {
  // State to manage the email input
  const [newEmail, setNewEmail] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  // Function to handle the email change
  const handleChangeEmail = () => {
    console.log("Email changed to:", newEmail);
    navigation.navigate("Confirm Email", {
      screen: route.name,
    });
  };

  return (
    <>
      <BackButton color={Colors.primary} />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter new email"
          value={newEmail}
          onChangeText={(text) => setNewEmail(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
          <Text style={styles.buttonText}>Submit</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary,
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
});

export default ChangeEmailScreen;
