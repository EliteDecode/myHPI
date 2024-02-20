import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "http://172.20.10.2:5000/myhpi/api/v1/forms/";
const API_URL = "https://myhpi.onrender.com/myhpi/api/v1/forms/";

const register_form = async (form, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}${userId}/register_form`,
    form,
    config
  );

  console.log(API_URL);

  if (response.data) {
    await AsyncStorage.setItem(
      `formData_${userId}`,
      JSON.stringify(response.data)
    );
    await AsyncStorage.setItem(
      `IntakeformStatus_${userId}`,
      JSON.stringify("IntakeForm Filled")
    );
  }

  return response.data;
};

const update_form = async (form, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(API_URL);

  const response = await axios.put(
    `${API_URL}${userId}/update_form`,
    form,
    config
  );

  if (response.data) {
    await AsyncStorage.setItem(
      `formData_${userId}`,
      JSON.stringify(response.data)
    );
    await AsyncStorage.setItem(
      `IntakeformStatus_${userId}`,
      JSON.stringify("IntakeForm Filled")
    );
  }

  return response.data;
};

const get_form = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}form/${userId}`, config);
  if (response.data) {
    await AsyncStorage.setItem("formData", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register_form,
  update_form,
  get_form,
};

export default authService;
