import axios from "axios";

const $host = axios.create({
  baseURL: "https://betting-platform-server-staging-asbin.ondigitalocean.app/",
});

export { $host };
