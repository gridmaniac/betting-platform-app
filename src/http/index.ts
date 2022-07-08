import axios from "axios";

const $host = axios.create({
  baseURL: "https://betting-platform-server-staging-asbin.ondigitalocean.app/",
});

function getAuth() {
  const userStorage = localStorage.getItem("header");
  return userStorage !== null ? JSON.parse(userStorage) : null;
}

export { $host, getAuth};
