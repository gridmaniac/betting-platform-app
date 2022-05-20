import axios from "axios";

const $host = axios.create({
  baseURL: "https://betting-platform-server-staging-asbin.ondigitalocean.app/",
});

const $hostImg = axios.create({
  baseURL: "https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/",
})

// const authInterceptor = config => {
//   config.headers.authtorization = `Bearer ${localStorage.getItem("token")}`
//   return config
// }

// $authHost.interceptors.request.use(authInterceptor)

export { $host, $hostImg };