import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const API_URL = "http://172.20.10.2:5000/myhpi/api/v1/users/";
// const API_URL = "https://myhpi.onrender.com/myhpi/api/v1/users/";

const API_URL = "https://myhpi-405813.wn.r.appspot.com/myhpi/api/v1/users/";
//Register user
const register = async (user) => {
  const response = await axios.post(`${API_URL}register`, user);

  return response.data;
};
//verify

const verify = async (data) => {
  const response = await axios.post(`${API_URL}verify`, data);

  if (response.data) {
    await AsyncStorage.setItem("userData", JSON.stringify(data));
  }

  return response.data;
};

//verify

const forgotPassword = async (data) => {
  const response = await axios.post(`${API_URL}forgot_password`, data);

  return response.data;
};

//logout

const logout = async () => {
  await AsyncStorage.removeItem("userData");
};

//login

const login = async (user) => {
  const response = await axios.post(`${API_URL}login`, user);

  if (response.data) {
    await AsyncStorage.setItem("userData", JSON.stringify(response.data));
  }
  return response.data;
};

//update

const update = async (user, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}${userId}/update_profile`,
    user,
    config
  );

  if (response.data) {
    await AsyncStorage.setItem("userData", JSON.stringify(response.data));
  }

  return response.data;
};

const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}${userId}`, config);

  if (response.data) {
    await AsyncStorage.setItem("userData", JSON.stringify(response.data));
  }

  return response.data;
};

const deleteAccount = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${API_URL}${userId}/delete_account`,
    config
  );

  if (response.data) {
    await AsyncStorage.removeItem("userData");
  }
};

const Verify_update = async (userData) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/abovi/users/verify_update_profile`,
      userData
    );
    await AsyncStorage.setItem("userData", JSON.stringify(data));

    if (data.message.includes("verified")) {
      await AsyncStorage.setItem("userData", JSON.stringify(data));
      setAddress(data.data.Address);
      setEmail(data.data.Email);
      setFirstname(data.data.Firstname);
      setLastname(data.data.Lastname);
      setPhone(data.data.Phone);
    }
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return message;
  }
};

const updatePassword = async (userData, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}${userId}/update_password`,
    userData,
    config
  );

  return response.data;
};

const authService = {
  register,
  update,
  logout,
  verify,
  login,
  forgotPassword,
  updatePassword,
  deleteAccount,
  getUser,
};

export default authService;
