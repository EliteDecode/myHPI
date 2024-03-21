import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-element-textinput";
import * as yup from "yup";
import Colors from "../../helpers/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome
import { Ionicons } from "@expo/vector-icons";
import ToastManager, { Toast } from "toastify-react-native";
import { updateProfileSchema } from "../../utils/schemas";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { reset, update } from "../../store/reducers/auth/authSlice";
import NavigationBar from "../../components/NavigationBar";
import RNPickerSelect from "react-native-picker-select";

const UpdateProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { openControlPanel } = route.params;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateInput, setDateInput] = useState();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = ({ type }, selected) => {
    if (type === "set") {
      const currentDate = selected;
      setSelectedDate(currentDate);

      if (Platform.OS === "android") {
        TogglePicker();
        setDateInput(currentDate.toDateString());
        setFieldValue("DOB", currentDate.toDateString());
      }
    } else {
      TogglePicker();
    }
  };

  const ConfirmIosDate = () => {
    setDateInput(selectedDate.toDateString());
    TogglePicker();
  };
  const TogglePicker = () => {
    setShowPicker(!showPicker);
  };

  const initialValues = {
    Firstname: user?.data?.Firstname || "",
    Middlename: user?.data?.Middlename || "",
    Lastname: user?.data?.Lastname || "",
    DOB: user?.data?.DOB || dateInput,
    // Age: user?.data?.Age || "",
    Sex: user?.data?.Sex || "",
    Address: user?.data?.Address || "",
    Phone: user?.data?.Phone || "",
    EmergencyContactName: user?.data?.EmergencyContactName || "",
    EmergencyContactPhone: user?.data?.EmergencyContactPhone || "",
    EmergencyContactRelationship:
      user?.data?.EmergencyContactRelationship || "",
  };

  const onSubmit = (values) => {
    dispatch(
      update({
        ...values,
        DOB: dateInput,
        UpdatedUser: true,
        Email: user?.data?.Email,
      })
    );

    console.log(values);
  };

  useEffect(() => {
    if (
      isSuccess &&
      message === "Congratulations your profile has been updated"
    ) {
      Alert.alert(
        "Information",
        "Congratulations profile updated successflly",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate(route.params.screen);
              dispatch(reset());
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
  }, [isError, isLoading, isSuccess, message, user, route, navigation]);

  return (
    <>
      <NavigationBar openControlPanel={openControlPanel} />
      <View style={styles.container}>
        <ToastManager
          textStyle={{ fontSize: 12 }}
          height={50}
          position="top"
          width={400}
        />
        <View className="h-36" style={{ backgroundColor: Colors.gray2 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(route.params.screen || "Home")}
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
                  {user?.data?.Firstname} {user?.data?.Lastname}
                </Text>
              </View>
              <Text
                className="mt-0.5"
                style={{ fontFamily: "sen", color: Colors.gray2 }}>
                {user?.data?.Email}
              </Text>
            </View>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={updateProfileSchema}
              onSubmit={onSubmit}>
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
              }) => (
                <>
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>First Name:</Text>
                    <TextInput
                      style={styles.input}
                      value={user?.data?.Firstname || values.Firstname}
                      placeholder="Firstname"
                      onChangeText={handleChange("Firstname")}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="user"
                          size={20}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.Firstname && errors.Firstname && (
                      <Text style={styles.errorText}>{errors.Firstname}</Text>
                    )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Middle Name:</Text>
                    <TextInput
                      style={styles.input}
                      value={user?.data?.Middlename || values.Middlename}
                      onChangeText={handleChange("Middlename")}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="user"
                          size={20}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.Middlename && errors.Middlename && (
                      <Text style={styles.errorText}>{errors.Middlename}</Text>
                    )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Last/Surname Name:</Text>
                    <TextInput
                      style={styles.input}
                      value={user?.data?.Lastname || values.Lastname}
                      onChangeText={handleChange("Lastname")}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="user"
                          size={20}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.Lastname && errors.Lastname && (
                      <Text style={styles.errorText}>{errors.Lastname}</Text>
                    )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>DOB:</Text>

                    {!showPicker && (
                      <Pressable onPress={TogglePicker}>
                        <TextInput
                          style={styles.input}
                          value={selectedDate.toDateString()}
                          showIcon={false}
                          editable={false}
                          onPressIn={TogglePicker}
                          renderLeftIcon={() => (
                            <FontAwesome
                              name="calendar-plus-o"
                              size={20}
                              color={Colors.primary}
                              style={{ width: "10%", opacity: 0.6 }}
                            />
                          )}
                        />
                      </Pressable>
                    )}

                    {showPicker && (
                      <DateTimePicker
                        style={styles.input2}
                        mode="date"
                        display="spinner"
                        value={selectedDate}
                        onChange={(event, selectedDate) =>
                          handleDateChange(event, selectedDate, setFieldValue)
                        }
                        maximumDate={new Date()}
                      />
                    )}

                    {showPicker && Platform.OS === "ios" && (
                      <View className="flex items-center flex-row justify-around space-x-4">
                        <TouchableOpacity
                          className=" w-1/2"
                          onPress={TogglePicker}
                          style={{ marginBottom: 10, marginTop: 10 }}>
                          <View
                            style={{
                              backgroundColor: Colors.dark,
                              borderRadius: 30,
                              paddingVertical: 12,
                              alignItems: "center",
                            }}>
                            <Text
                              style={{
                                color: "white",
                                fontFamily: "sen",
                                fontSize: 16,
                                fontWeight: "bold",
                              }}>
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className=" w-1/2"
                          onPress={ConfirmIosDate}
                          style={{ marginBottom: 10, marginTop: 10 }}>
                          <View
                            style={{
                              backgroundColor: Colors.primary,
                              borderRadius: 30,
                              paddingVertical: 12,
                              alignItems: "center",
                            }}>
                            <Text
                              style={{
                                color: "white",
                                fontFamily: "sen",
                                fontSize: 16,
                                fontWeight: "bold",
                              }}>
                              Confirm
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}

                    {touched.DOB && errors.DOB && (
                      <Text style={styles.errorText}>{errors.DOB}</Text>
                    )}
                  </View>

                  {/* {values.DOB && (
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>AGE:</Text>
                      <TextInput
                        style={styles.input}
                        showIcon={false}
                        value={calculateAge(values.DOB)}
                        editable={false}
                        onChangeText={handleChange("Age")}
                        keyboardType="numeric"
                        renderLeftIcon={() => (
                          <FontAwesome
                            name="calendar-plus-o"
                            size={20}
                            color={Colors.primary}
                            style={{ width: "10%", opacity: 0.6 }}
                          />
                        )}
                      />
                      {touched.Age && errors.Age && (
                        <Text style={styles.errorText}>{errors.Age}</Text>
                      )}
                    </View>
                  )} */}

                  {/* <View style={styles.formGroup}>
                    <Text style={styles.label}>SEX assigned at birth:</Text>
                    <TextInput
                      style={styles.input}
                      value={user?.data?.Sex || values.Sex}
                      onChangeText={handleChange("Sex")}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="user-plus"
                          size={19}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.Sex && errors.Sex && (
                      <Text style={styles.errorText}>{errors.Sex}</Text>
                    )}
                  </View> */}

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>SEX assigned at birth:</Text>
                    <View style={styles.input}>
                      <View className="flex-row items-center space-x-2">
                        <FontAwesome
                          name="user-plus"
                          size={19}
                          color={Colors.primary}
                          style={{
                            width: "10%",
                            opacity: 0.6,
                            marginTop: "5%",
                          }}
                        />
                        <View className="w-[98%] ">
                          <RNPickerSelect
                            placeholder={{ label: "Select", value: null }}
                            onValueChange={handleChange("Sex")}
                            items={[
                              { label: "Male", value: "Male" },
                              { label: "Female", value: "Female" },
                              { label: "Others", value: "Others" },
                            ]}
                            style={{
                              inputIOS: {
                                borderRadius: 10,
                                marginTop: 15,
                              },
                              inputAndroid: {
                                borderRadius: 4,
                              },
                            }}
                            // value={
                            //   user?.data?.Sex ? user?.data?.Sex : values.Sex
                            // }
                          />
                        </View>
                      </View>
                      {touched.Sex && errors.Sex && (
                        <Text style={{ color: "red" }}>{errors.Sex}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Address:</Text>
                    <TextInput
                      style={styles.input}
                      value={user?.data?.Address || values.Address}
                      onChangeText={handleChange("Address")}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="location-arrow"
                          size={22}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.Address && errors.Address && (
                      <Text style={styles.errorText}>{errors.Address}</Text>
                    )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Mobile phone:</Text>
                    <TextInput
                      style={styles.input}
                      value={user?.data?.Phone || values.Phone}
                      onChangeText={handleChange("Phone")}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="phone"
                          size={20}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.Phone && errors.Phone && (
                      <Text style={styles.errorText}>{errors.Phone}</Text>
                    )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Name of emergency contact:</Text>
                    <TextInput
                      style={styles.input}
                      value={
                        user?.data?.EmergencyContactName ||
                        values.EmergencyContactName
                      }
                      onChangeText={handleChange("EmergencyContactName")}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="user-md"
                          size={20}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.EmergencyContactName &&
                      errors.EmergencyContactName && (
                        <Text style={styles.errorText}>
                          {errors.EmergencyContactName}
                        </Text>
                      )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>
                      Emergency contact mobile phone:
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={
                        user?.data?.EmergencyContactPhone ||
                        values.EmergencyContactPhone
                      }
                      onChangeText={handleChange("EmergencyContactPhone")}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="mobile-phone"
                          size={23}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.EmergencyContactPhone &&
                      errors.EmergencyContactPhone && (
                        <Text style={styles.errorText}>
                          {errors.EmergencyContactPhone}
                        </Text>
                      )}
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>
                      Relationship to Emergency Contact:
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={
                        user?.data?.EmergencyContactRelationship ||
                        values.EmergencyContactRelationship
                      }
                      onChangeText={handleChange(
                        "EmergencyContactRelationship"
                      )}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="users"
                          size={18}
                          color={Colors.primary}
                          style={{ width: "10%", opacity: 0.6 }}
                        />
                      )}
                    />
                    {touched.EmergencyContactRelationship &&
                      errors.EmergencyContactRelationship && (
                        <Text style={styles.errorText}>
                          {errors.EmergencyContactRelationship}
                        </Text>
                      )}
                  </View>
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
                          "Update Profile"
                        )}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            <View style={{ marginBottom: 500 }} />
          </ScrollView>
        </View>
      </View>
    </>
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
    marginLeft: 5,
  },
  input: {
    height: 55,
    paddingHorizontal: 18,
    borderRadius: 30,
    fontSize: 14,
    borderColor: Colors.gray,
    backgroundColor: Colors.gray,
  },

  input2: {
    height: 200,
    paddingHorizontal: 18,
    borderRadius: 30,
    fontSize: 14,
    borderColor: Colors.gray,
    backgroundColor: Colors.gray,
  },
  placeholderStyle: { fontSize: 10, zIndex: 20, opacity: 0.8 },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 5,
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
