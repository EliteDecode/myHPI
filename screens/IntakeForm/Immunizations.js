import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-element-textinput";
import { Formik } from "formik";
import RNPickerSelect from "react-native-picker-select";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import BtnReturnIntakeForm from "../../components/BtnReturnIntakeForm";

const Immunizations = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector((state) => state.auth);

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
    tetanusLastVaccineYear: "",
    covid: { selectedOption: null, date: "" },
    hepatitisA: { selectedOption: null, date: "" },
    hepatitisB: { selectedOption: null, date: "" },
    pneumonia: { selectedOption: null, date: "" },
    influenza: { selectedOption: null, date: "" },
    hpv: { selectedOption: null, date: "" },
  };

  const validationSchema = Yup.object({
    tetanusLastVaccineYear: Yup.string().required(
      "Year of last vaccine is required"
    ),
    covid: Yup.object({
      selectedOption: Yup.string().required("Please select Yes or No"),
      date: Yup.string().when("selectedOption", {
        is: (value) => value === "Yes",
        then: (schema) =>
          schema
            .matches(
              /^[a-zA-Z0-9\s,.';:]*$/,
              "Date must not contain special characters"
            )
            .max(15, "Date must be at most 15 characters long")
            .required("Date is required for selected option Yes"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    hepatitisA: Yup.object({
      selectedOption: Yup.string().required("Please select Yes or No"),
      date: Yup.string().when("selectedOption", {
        is: (value) => value === "Yes",
        then: (schema) =>
          schema
            .matches(
              /^[a-zA-Z0-9\s,.';:]*$/,
              "Date must not contain special characters"
            )
            .max(15, "Date must be at most 15 characters long")
            .required("Date is required for selected option Yes"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    hepatitisB: Yup.object({
      selectedOption: Yup.string().required("Please select Yes or No"),
      date: Yup.string().when("selectedOption", {
        is: (value) => value === "Yes",
        then: (schema) =>
          schema
            .matches(
              /^[a-zA-Z0-9\s,.';:]*$/,
              "Date must not contain special characters"
            )
            .max(15, "Date must be at most 15 characters long")
            .required("Date is required for selected option Yes"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    pneumonia: Yup.object({
      selectedOption: Yup.string().required("Please select Yes or No"),
      date: Yup.string().when("selectedOption", {
        is: (value) => value === "Yes",
        then: (schema) =>
          schema
            .matches(
              /^[a-zA-Z0-9\s,.';:]*$/,
              "Date must not contain special characters"
            )
            .max(15, "Date must be at most 15 characters long")
            .required("Date is required for selected option Yes"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    influenza: Yup.object({
      selectedOption: Yup.string().required("Please select Yes or No"),
      date: Yup.string().when("selectedOption", {
        is: (value) => value === "Yes",
        then: (schema) =>
          schema
            .matches(
              /^[a-zA-Z0-9\s,.';:]*$/,
              "Date must not contain special characters"
            )
            .max(15, "Date must be at most 15 characters long")
            .required("Date is required for selected option Yes"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    hpv: Yup.object({
      selectedOption: Yup.string().required("Please select Yes or No"),
      date: Yup.string().when("selectedOption", {
        is: (value) => value === "Yes",
        then: (schema) =>
          schema
            .matches(
              /^[a-zA-Z0-9\s,.';:]*$/,
              "Date must not contain special characters"
            )
            .max(15, "Date must be at most 15 characters long")
            .required("Date is required for selected option Yes"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
  });

  const [initialImmunization, setInitialImmunization] = useState();
  useEffect(() => {
    const loadFormValues = async () => {
      try {
        const loggedInUserId = user?.data?._id;
        const savedValues = await AsyncStorage.getItem(
          `immunizations_${loggedInUserId}`
        );
        if (savedValues) {
          const parsedValues = JSON.parse(savedValues);
          setInitialImmunization(parsedValues);
        }
      } catch (error) {
        console.error("Error loading form values from local storage:", error);
      }
    };

    loadFormValues();
  }, [route, navigation]);

  const saveAndContinue = async (values) => {
    try {
      const loggedInUserId = user?.data?._id;
      await AsyncStorage.setItem(
        `immunizations_${loggedInUserId}`,
        JSON.stringify(values)
      );
      navigation.navigate("IntakeForm");
    } catch (error) {
      console.error("Error saving form values to local storage:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={
            initialImmunization ? initialImmunization : initialValues
          }
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => saveAndContinue(values)}>
          {({
            values,
            handleChange,
            handleSubmit,
            resetForm,
            errors,
            setValues,
            touched,
          }) => (
            <>
              <View style={{ marginBottom: 12 }}>
                <Text style={{ color: Colors.gray2, marginBottom: 5 }}>
                  Tetanus (Year of Last Vaccine)
                </Text>
                <TextInput
                  placeholder="Enter year of last vaccine"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 12,
                    padding: 12,
                    height: 60,
                  }}
                  value={
                    initialImmunization?.tetanusLastVaccineYear ||
                    values.tetanusLastVaccineYear
                  }
                  onChangeText={handleChange("tetanusLastVaccineYear")}
                />
                {errors.tetanusLastVaccineYear &&
                  touched.tetanusLastVaccineYear && (
                    <Text style={{ color: "red" }}>
                      {errors.tetanusLastVaccineYear}
                    </Text>
                  )}
              </View>

              {/* Other immunizations */}
              {[
                "covid",
                "hepatitisA",
                "hepatitisB",
                "pneumonia",
                "influenza",
                "hpv",
              ].map((vaccine) => (
                <View key={vaccine} style={{ marginBottom: 5 }}>
                  <Text style={{ color: Colors.gray2, marginBottom: 1 }}>
                    {vaccine.charAt(0).toUpperCase() + vaccine.slice(1)}{" "}
                    {initialImmunization && (
                      <Text className="font-bold">
                        : {initialImmunization[vaccine]?.selectedOption}
                        {initialImmunization[vaccine]?.date
                          ? `, ${initialImmunization[vaccine].date}`
                          : ""}
                      </Text>
                    )}
                  </Text>
                  <View className="my-2 border rounded-lg border-[#ccc]">
                    <RNPickerSelect
                      placeholder={{ label: "Select", value: null }}
                      onValueChange={(value) =>
                        handleChange(`${vaccine}.selectedOption`)(value)
                      }
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
                  <View>
                    {values[vaccine]?.selectedOption === null && (
                      <Text style={{ color: "red" }}>
                        {errors[vaccine]?.selectedOption}
                      </Text>
                    )}
                    {values[vaccine].selectedOption === "Yes" && (
                      <>
                        <TextInput
                          placeholder="Date"
                          style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 12,
                            padding: 12,
                            height: 60,
                          }}
                          value={values[vaccine].date}
                          onChangeText={handleChange(`${vaccine}.date`)}
                          error={!!errors[vaccine]?.date}
                        />
                        {errors[vaccine]?.date && (
                          <Text style={{ color: "red" }}>
                            {errors[vaccine].date}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                </View>
              ))}

              <View
                className="space-x-4"
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}>
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
                    Complete
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

export default Immunizations;
