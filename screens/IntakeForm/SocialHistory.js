import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

const SocialHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(route?.params?.screen || "IntakeForm")
          }>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#478AFB"
            style={{ marginLeft: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route]);
  const initialValues = {
    maritalStatus: "",
    profession: "",
    tobaccoUse: "",
    quantity: "",
    recreationalDrugUse: "",
    sexualPartners: "",
  };

  const saveAndContinue = (values) => {
    navigation.navigate("Allergies", {
      screen: route.name ? route.name : "IntakeForm",
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            saveAndContinue(values);
            resetForm();
          }}>
          {({ values, handleChange, handleSubmit, resetForm }) => (
            <>
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: Colors.gray2,

                    marginBottom: 8,
                  }}>
                  Marital Status
                </Text>
                <RNPickerSelect
                  placeholder={{ label: "Select Marital Status", value: null }}
                  onValueChange={handleChange("maritalStatus")}
                  items={[
                    { label: "Single", value: "Single" },
                    { label: "Married", value: "Married" },
                    { label: "Divorced", value: "Divorced" },
                    { label: "Widowed", value: "Widowed" },
                  ]}
                />
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: Colors.gray2,

                    marginBottom: 8,
                  }}>
                  Profession
                </Text>
                <TextInput
                  placeholder="Enter Profession"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 12,
                    padding: 12,
                  }}
                  value={values.profession}
                  onChangeText={handleChange("profession")}
                />
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: Colors.gray2,

                    marginBottom: 8,
                  }}>
                  Tobacco Use
                </Text>
                <RNPickerSelect
                  placeholder={{ label: "Select Tobacco Use", value: null }}
                  onValueChange={handleChange("tobaccoUse")}
                  items={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </View>

              {values.tobaccoUse === "Yes" && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      color: Colors.gray2,

                      marginBottom: 8,
                    }}>
                    Quantity
                  </Text>
                  <TextInput
                    placeholder="Enter Quantity"
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 12,
                      padding: 12,
                    }}
                    value={values.quantity}
                    onChangeText={handleChange("quantity")}
                  />
                </View>
              )}

              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: Colors.gray2,

                    marginBottom: 8,
                  }}>
                  Recreational Drug Use
                </Text>
                <RNPickerSelect
                  placeholder={{
                    label: "Select Recreational Drug Use",
                    value: null,
                  }}
                  onValueChange={handleChange("recreationalDrugUse")}
                  items={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </View>

              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: Colors.gray2,

                    marginBottom: 8,
                  }}>
                  Sexual Partners
                </Text>
                <RNPickerSelect
                  placeholder={{ label: "Select Sexual Partners", value: null }}
                  onValueChange={handleChange("sexualPartners")}
                  items={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Bi-sexual", value: "Bi-sexual" },
                    { label: "Abstinence", value: "Abstinence" },
                  ]}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
                className="space-x-4">
                <TouchableOpacity
                  onPress={() => resetForm()}
                  style={{
                    flex: 1,
                    backgroundColor: "#ccc",
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    flex: 1,
                    backgroundColor: "#478AFB",
                    padding: 10,
                    borderRadius: 5,
                    marginRight: 8,
                  }}>
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Save & Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </View>
  );
};

export default SocialHistory;
