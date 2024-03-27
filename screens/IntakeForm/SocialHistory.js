import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TextInput } from "react-native-element-textinput";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import BtnReturnIntakeForm from "../../components/BtnReturnIntakeForm";

const SocialHistorySchema = Yup.object().shape({
  maritalStatus: Yup.string().required("Marital Status is required"),
  profession: Yup.string()
    .matches(
      /^[a-zA-Z0-9\s,.';:]*$/,
      "Profession must not contain special characters"
    )
    .max(30, "Profession must be at most 30 characters long")
    .required("Profession is required"),
  tobaccoUse: Yup.string().required("Tobacco Use is required"),
  quantity: Yup.string().when("tobaccoUse", {
    is: "Yes",
    then: Yup.string()
      .required("Quantity is required when Tobacco Use is Yes")
      .matches(
        /^[a-zA-Z0-9\s,.';:]*$/,
        "Text must not contain special characters"
      )
      .max(10, "Text must be at most 10 characters long"),
  }),
  recreationalDrugUse: Yup.string().required(
    "Recreational Drug Use is required"
  ),
  sexualPartners: Yup.string().required("Sexual Partners is required"),
});

const SocialHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector((state) => state.auth);
  const [initialSocialHistory, setInitialSocialHistory] = useState();

  const initialValues = {
    maritalStatus: "",
    profession: "",
    tobaccoUse: "",
    quantity: "",
    recreationalDrugUse: "",
    sexualPartners: "",
  };

  useEffect(() => {
    const fetchInitialValues = async () => {
      try {
        const loggedInUserId = user?.data?._id;
        const storedValues = await AsyncStorage.getItem(
          `socialHistory_${loggedInUserId}`
        );
        if (storedValues) {
          // Set the initial values in Formik
          setInitialSocialHistory(JSON.parse(storedValues));
        }
      } catch (error) {
        console.error("Error fetching values from local storage:", error);
      }
    };

    fetchInitialValues();
  }, [route, navigation]);

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

  const saveAndContinue = async (values) => {
    try {
      const loggedInUserId = user?.data?._id;
      await AsyncStorage.setItem(
        `socialHistory_${loggedInUserId}`,
        JSON.stringify(values)
      );
      navigation.navigate("Allergies Form", {
        screen: route.name ? route.name : "IntakeForm",
      });
    } catch (error) {
      console.error("Error saving values to storage:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Formik
          enableReinitialize={true}
          initialValues={
            initialSocialHistory ? initialSocialHistory : initialValues
          }
          validationSchema={SocialHistorySchema}
          onSubmit={(values, { resetForm }) => {
            saveAndContinue(values);
            resetForm();
          }}>
          {({
            values,
            handleChange,
            handleSubmit,
            resetForm,
            errors,
            touched,
          }) => (
            <>
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    color: Colors.gray2,
                    marginBottom: 5,
                  }}>
                  Marital Status{" "}
                  {initialSocialHistory &&
                    `: ${initialSocialHistory?.maritalStatus}`}
                </Text>
                <View className="my-2 border rounded-lg border-[#ccc]">
                  <RNPickerSelect
                    placeholder={{
                      label: "Select Marital Status",
                      value: null,
                    }}
                    onValueChange={handleChange("maritalStatus")}
                    items={[
                      { label: "Single", value: "Single" },
                      { label: "Married", value: "Married" },
                      { label: "Divorced", value: "Divorced" },
                      { label: "Widowed", value: "Widowed" },
                    ]}
                    style={{
                      inputIOS: {
                        borderRadius: 10,
                        paddingHorizontal: 13,
                        paddingVertical: 16,
                      },
                      inputAndroid: {
                        borderRadius: 4,
                        paddingHorizontal: 13,
                        paddingVertical: 15,
                      },
                    }}
                  />
                </View>
                {touched.maritalStatus && errors.maritalStatus && (
                  <Text style={{ color: "red" }}>{errors.maritalStatus}</Text>
                )}
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    color: Colors.gray2,
                    marginBottom: 5,
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
                    height: 60,
                  }}
                  value={initialSocialHistory?.profession || values.profession}
                  onChangeText={handleChange("profession")}
                />
                {touched.profession && errors.profession && (
                  <Text style={{ color: "red" }}>{errors.profession}</Text>
                )}
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    color: Colors.gray2,
                    marginBottom: 5,
                  }}>
                  Tobacco Use{" "}
                  {initialSocialHistory &&
                    `: ${initialSocialHistory?.tobaccoUse}`}
                </Text>
                <View className="my-2 border rounded-lg border-[#ccc]">
                  <RNPickerSelect
                    placeholder={{ label: "Select Tobacco Use", value: null }}
                    onValueChange={handleChange("tobaccoUse")}
                    items={[
                      { label: "Yes", value: "Yes" },
                      { label: "No", value: "No" },
                    ]}
                    style={{
                      inputIOS: {
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 10,
                        paddingHorizontal: 13,
                        paddingVertical: 16,
                      },
                      inputAndroid: {
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 4,
                        paddingHorizontal: 13,
                        paddingVertical: 15,
                      },
                    }}
                  />
                </View>
                {touched.tobaccoUse && errors.tobaccoUse && (
                  <Text style={{ color: "red" }}>{errors.tobaccoUse}</Text>
                )}
              </View>

              {values.tobaccoUse == "Yes" && (
                <View style={{ marginBottom: 16 }}>
                  <Text
                    style={{
                      color: Colors.gray2,
                      marginBottom: 5,
                    }}>
                    Quantity
                  </Text>
                  <TextInput
                    placeholder="Enter Quantity"
                    style={{
                      borderRadius: 12,
                      padding: 12,
                      height: 60,
                      borderWidth: 1,
                      borderColor: "#ccc",
                    }}
                    value={initialSocialHistory?.quantity || values.quantity}
                    onChangeText={handleChange("quantity")}
                  />
                  {touched.quantity && errors.quantity && (
                    <Text style={{ color: "red" }}>{errors.quantity}</Text>
                  )}
                </View>
              )}

              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    color: Colors.gray2,
                    marginBottom: 5,
                  }}>
                  Recreational Drug Use{" "}
                  {initialSocialHistory &&
                    `: ${initialSocialHistory?.recreationalDrugUse}`}
                </Text>
                <View className="my-2 border rounded-lg border-[#ccc]">
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
                    style={{
                      inputIOS: {
                        borderRadius: 10,
                        paddingHorizontal: 13,
                        paddingVertical: 16,
                      },
                      inputAndroid: {
                        borderRadius: 4,
                        paddingHorizontal: 13,
                        paddingVertical: 15,
                      },
                    }}
                  />
                </View>
                {touched.recreationalDrugUse && errors.recreationalDrugUse && (
                  <Text style={{ color: "red" }}>
                    {errors.recreationalDrugUse}
                  </Text>
                )}
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    color: Colors.gray2,
                    marginBottom: 5,
                  }}>
                  Sexual Partners{" "}
                  {initialSocialHistory &&
                    `: ${initialSocialHistory?.sexualPartners}`}
                </Text>
                <View className="my-2 border rounded-lg border-[#ccc]">
                  <RNPickerSelect
                    placeholder={{
                      label: "Select Sexual Partners",
                      value: null,
                    }}
                    onValueChange={handleChange("sexualPartners")}
                    items={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Bi-sexual", value: "Bi-sexual" },
                      { label: "Abstinence", value: "Abstinence" },
                    ]}
                    style={{
                      inputIOS: {
                        borderRadius: 10,
                        paddingHorizontal: 13,
                        paddingVertical: 16,
                      },
                      inputAndroid: {
                        borderRadius: 4,
                        paddingHorizontal: 13,
                        paddingVertical: 15,
                      },
                    }}
                  />
                </View>
                {touched.sexualPartners && errors.sexualPartners && (
                  <Text style={{ color: "red" }}>{errors.sexualPartners}</Text>
                )}
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
        <View style={{ marginBottom: 80 }} />
      </ScrollView>
      <BtnReturnIntakeForm />
    </View>
  );
};

export default SocialHistory;
