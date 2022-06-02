import axios from "axios";
import Cookies from "js-cookie";

const URL = "/api/users/";

export const getUser = async () => {
  const responseToken = await axios.get(URL + "refresh");
  const token = responseToken.data.accessToken;
  const response = await axios.get(URL + "single", {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(URL + "register", userData);
  if (response.data) Cookies.set("aflog", true, { expires: 1 });
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(URL + "login", userData);
  if (response.data) Cookies.set("aflog", true, { expires: 1 });
  return response.data;
};

export const logout = async () => {
  const responseToken = await axios.get(URL + "refresh");
  const token = responseToken.data.accessToken;
  const response = await axios.delete(URL + "logout", {
    headers: { authorization: `Bearer ${token}` },
  });
  if (response.data) Cookies.remove("aflog");
  return response.data;
};

const userService = { getUser, register, login, logout };
export default userService;
