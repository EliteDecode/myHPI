import axios from "axios";

const API_URL = "http://192.168.1.185:5000/myhpi/api/v1/complaints/";
// const API_URL = "https://myhpi.onrender.com/myhpi/api/v1/complaints/";
// const API_URL =
//   "https://myhpibackend.uw.r.appspot.com/myhpi/api/v1/complaints/";

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

const med_request = async (request, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}${userId}/new_complaint`,
    request,
    config
  );

  return response.data;
};

const authService = {
  new_complaint,
  get_complaints,
  delete_complaints,
  med_request,
};

export default authService;
