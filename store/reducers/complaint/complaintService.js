import axios from "axios";

// const API_URL = "http://172.20.10.2:5000/myhpi/api/v1/complaints/";
const API_URL = "https://myhpi.onrender.com/myhpi/api/v1/complaints/";

const new_complaint = async (complaint, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}${userId}/new_complaint`,
    complaint,
    config
  );

  return response.data;
};

const get_complaints = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}complaint/${userId}`, config);

  return response.data;
};

const delete_complaints = async (userId, complaintId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}complaint/${userId}/${complaintId}`,
    config
  );

  return response.data;
};

const authService = {
  new_complaint,
  get_complaints,
  delete_complaints,
};

export default authService;
