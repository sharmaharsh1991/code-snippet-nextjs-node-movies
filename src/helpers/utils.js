import Cookies from "js-cookie";

const setToken = (token) => {
  Cookies.set("token", JSON.stringify(token), { expires: 7, path: "/" });
};

const getToken = () => {
  const cookieValue = Cookies.get("token");
  return cookieValue ? JSON.parse(cookieValue) : null;
};

const removeToken = () => {
  Cookies.remove("token");
};

export { setToken, getToken, removeToken };
