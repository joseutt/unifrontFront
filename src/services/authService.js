import axios from "axios";

const API_URL = "http://localhost:8000";

export const loginRequest = async (email, password) => {
  const formData = new URLSearchParams();

  formData.append("username", email);

  formData.append("password", password);

  const response = await axios.post(`${API_URL}/auth/login`, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};
