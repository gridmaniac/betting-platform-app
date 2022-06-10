import { $host, $hostImg } from "./index";

export const fetchMMA = async () => {
  try {
    const { data } = await $host.get("api/v2/events/MMA");
    return data;
  } catch (error) {
    return { message: "somthing wrong" };
  }
};
export const fetchSoccer = async () => {
  try {
    const { data } = await $host.get("api/v2/events/Soccer");
    return data;
  } catch (error) {
    return { message: "somthing wrong" };
  }
};


export const fetchFighterImg= async (firstName, lastName) => {
  try {
    const { data } = await $host.get(`${firstName} ${lastName}.png`);
    return data;
  } catch (error) {
    const { data } = await $host.get(`silhouette.png`);
    return data;
  }
};