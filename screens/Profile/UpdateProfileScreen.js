import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  middleName: yup.string(),
  lastName: yup.string().required("Last Name is required"),
  dob: yup.string().required("DOB is required"),
  age: yup.number().required("Age is required"),
  sexAssignedAtBirth: yup
    .string()
    .required("Sex assigned at birth is required"),
  address: yup.string().required("Address is required"),
  mobile: yup.string().required("Mobile is required"),
  emergencyContactName: yup
    .string()
    .required("Emergency contact name is required"),
  emergencyContactMobile: yup
    .string()
    .required("Emergency contact mobile is required"),
  relationshipToEmergencyContact: yup
    .string()
    .required("Relationship to emergency contact is required"),
});

const UpdateProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    age: "",
    sexAssignedAtBirth: "",
    address: "",
    mobile: "",
    emergencyContactName: "",
    emergencyContactMobile: "",
    relationshipToEmergencyContact: "",
  };

  const onSubmit = (values) => {
    // Implement logic to update the profile data
    console.log("Form data updated:", values);
  };

  return (
    <View style={styles.container}>
      <View className="h-36" style={{ backgroundColor: Colors.gray2 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(route.params.screen)}
          className="mt-5 flex-row space-x-2 items-center ">
          <Ionicons
            name="arrow-back"
            size={28}
            color={Colors.white}
            style={{ marginLeft: 16 }}
          />
        </TouchableOpacity>
      </View>
      <View
        className=" bg-white py-3  h-screen -mt-16"
        style={{ borderTopEndRadius: 50, borderTopStartRadius: 50 }}>
        <ScrollView
          className="py-5 px-5"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View className="items-center justify-center mt-10 mb-5">
            <Image
              source={require("../../assets/images/confirm.jpg")}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                marginBottom: 10,
                borderColor: Colors.primary,
                borderWidth: 4,
              }}
            />
            <View className="flex-row space-x-2">
              <Text
                className="font-bold text-[19px] "
                style={{ fontFamily: "ca", color: Colors.gray2 }}>
                John Michealis
              </Text>
            </View>
            <Text
              className="mt-0.5"
              style={{ fontFamily: "sen", color: Colors.gray2 }}>
              sirelite11@gmail.com
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>First Name:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.firstName}
                    onChangeText={handleChange("firstName")}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Middle Name:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.middleName}
                    onChangeText={handleChange("middleName")}
                  />
                  {touched.middleName && errors.middleName && (
                    <Text style={styles.errorText}>{errors.middleName}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Last/Surname Name:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>DOB:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.dob}
                    onChangeText={handleChange("dob")}
                  />
                  {touched.dob && errors.dob && (
                    <Text style={styles.errorText}>{errors.dob}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>AGE:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.age}
                    onChangeText={handleChange("age")}
                    keyboardType="numeric"
                  />
                  {touched.age && errors.age && (
                    <Text style={styles.errorText}>{errors.age}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>SEX assigned at birth:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.sexAssignedAtBirth}
                    onChangeText={handleChange("sexAssignedAtBirth")}
                  />
                  {touched.sexAssignedAtBirth && errors.sexAssignedAtBirth && (
                    <Text style={styles.errorText}>
                      {errors.sexAssignedAtBirth}
                    </Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Address:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.address}
                    onChangeText={handleChange("address")}
                  />
                  {touched.address && errors.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Mobile phone:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.mobile}
                    onChangeText={handleChange("mobile")}
                  />
                  {touched.mobile && errors.mobile && (
                    <Text style={styles.errorText}>{errors.mobile}</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Name of emergency contact:</Text>
                  <TextInput
                    style={styles.input}
                    value={values.emergencyContactName}
                    onChangeText={handleChange("emergencyContactName")}
                  />
                  {touched.emergencyContactName &&
                    errors.emergencyContactName && (
                      <Text style={styles.errorText}>
                        {errors.emergencyContactName}
                      </Text>
                    )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>
                    Emergency contact mobile phone:
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={values.emergencyContactMobile}
                    onChangeText={handleChange("emergencyContactMobile")}
                  />
                  {touched.emergencyContactMobile &&
                    errors.emergencyContactMobile && (
                      <Text style={styles.errorText}>
                        {errors.emergencyContactMobile}
                      </Text>
                    )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>
                    Relationship to Emergency Contact:
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={values.relationshipToEmergencyContact}
                    onChangeText={handleChange(
                      "relationshipToEmergencyContact"
                    )}
                  />
                  {touched.relationshipToEmergencyContact &&
                    errors.relationshipToEmergencyContact && (
                      <Text style={styles.errorText}>
                        {errors.relationshipToEmergencyContact}
                      </Text>
                    )}
                </View>

                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleSubmit}>
                  <Text style={styles.updateButtonText}>Update Profile</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <View style={{ marginBottom: 300 }} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "ca",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  updateButton: {
    backgroundColor: "#478AFB",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default UpdateProfileScreen;
